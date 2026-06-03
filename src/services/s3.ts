// Client-side S3 service.
//
// SECURITY: AWS credentials are NOT used in the browser in production. Uploads
// go through a presigned URL minted by the `/api/s3` serverless function, and
// list/delete are proxied through the same endpoint, so no secret is ever
// shipped in the client bundle.
//
// In local `npm run dev`, if VITE_AWS_* creds are present, a dynamically
// imported dev-only module talks to S3 directly (so you don't need
// `vercel dev`). That branch is guarded by `import.meta.env.DEV` and is removed
// from production builds — the AWS SDK never reaches the prod client bundle.

const BUCKET_NAME = (import.meta.env.VITE_S3_BUCKET || "pagina-mama").trim();
const ASSETS_PREFIX = "assets2/desarrollos";
const AREAS_PREFIX = "assets2/areas";

interface S3ObjectMeta {
    key: string;
    size?: number;
    lastModified?: Date;
}

function hasDevCreds(): boolean {
    return Boolean(
        (import.meta.env.VITE_AWS_ACCESS_KEY_ID || "").trim() &&
        (import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "").trim(),
    );
}

async function apiPresignAndPut(key: string, body: Uint8Array, contentType: string): Promise<void> {
    const presignRes = await fetch("/api/s3?action=presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, contentType }),
    });
    if (!presignRes.ok) {
        const detail = await presignRes.json().catch(() => ({}));
        throw new Error(detail.error || `Could not get upload URL (HTTP ${presignRes.status})`);
    }
    const { url } = await presignRes.json();
    const putRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        // Cast: a Uint8Array is a valid fetch body at runtime; the cast satisfies
        // the stricter BlobPart typing in newer TS lib (generic ArrayBufferLike).
        body: new Blob([body as BlobPart], { type: contentType }),
    });
    if (!putRes.ok) throw new Error(`Upload failed (HTTP ${putRes.status})`);
}

async function putObject(key: string, body: Uint8Array, contentType: string): Promise<void> {
    if (import.meta.env.DEV && hasDevCreds()) {
        const { devPutObject } = await import("./s3DevDirect");
        return devPutObject(key, body, contentType);
    }
    return apiPresignAndPut(key, body, contentType);
}

async function listObjects(prefix: string): Promise<S3ObjectMeta[]> {
    if (import.meta.env.DEV && hasDevCreds()) {
        const { devListObjects } = await import("./s3DevDirect");
        return devListObjects(prefix);
    }
    const res = await fetch(`/api/s3?action=list&prefix=${encodeURIComponent(prefix)}`);
    if (!res.ok) throw new Error(`Could not list media (HTTP ${res.status})`);
    const data = await res.json();
    return (data.objects || []).map((o: { key: string; size?: number; lastModified?: string }) => ({
        key: o.key,
        size: o.size,
        lastModified: o.lastModified ? new Date(o.lastModified) : undefined,
    }));
}

async function deleteObject(key: string): Promise<void> {
    if (import.meta.env.DEV && hasDevCreds()) {
        const { devDeleteObject } = await import("./s3DevDirect");
        return devDeleteObject(key);
    }
    const res = await fetch("/api/s3?action=delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
    });
    if (!res.ok) throw new Error(`Could not delete media (HTTP ${res.status})`);
}

export const VALID_FILE_TYPES = {
    pdfs: ["brochure.pdf", "hoja.pdf", "planos.pdf"],
    video: ["video.mp4"],
    banner: ["banner.jpg"],
    thumbnail: ["thumbnail.webp"],
    gallery: /^image \(\d+\)\.jpg$/i,
} as const;

export interface UploadResult {
    success: boolean;
    key?: string;
    url?: string;
    targetName?: string;
    error?: string;
}

export interface MediaFile {
    key: string;
    name: string;
    url: string;
    type: "pdf" | "video" | "banner" | "gallery" | "thumbnail";
    size?: number;
    lastModified?: Date;
}

/**
 * Normalizes a string for use in S3 paths.
 * We keep it minimal but ensure consistent case if needed.
 * For now, we just trim as per user request for exact matches.
 */
export function normalizePathSegment(value: string): string {
    return String(value || "").trim();
}

async function convertImageToMime(file: File, mimeType: "image/jpeg" | "image/webp"): Promise<Uint8Array> {
    try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return new Uint8Array(await file.arrayBuffer());
        }
        ctx.drawImage(bitmap, 0, 0);
        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, mimeType, mimeType === "image/jpeg" ? 0.9 : undefined),
        );
        if (!blob) {
            return new Uint8Array(await file.arrayBuffer());
        }
        const buffer = await blob.arrayBuffer();
        return new Uint8Array(buffer);
    } catch (error) {
        console.warn("Image conversion fallback:", error);
        return new Uint8Array(await file.arrayBuffer());
    }
}

function getFriendlyS3Error(error: unknown): string {
    const defaultMessage = "Unknown upload error";
    if (!error || typeof error !== "object") return defaultMessage;

    const err = error as { name?: string; message?: string };
    if (err.name === "InvalidAccessKeyId" || (err.message || "").includes("Access Key Id")) {
        return "S3 rejected the access key ID. This is not a CORS error. Check which env file is winning and restart the Vite server so the browser picks up the latest credentials.";
    }
    if (err.name === "SignatureDoesNotMatch" || (err.message || "").includes("signature")) {
        return "S3 signature mismatch. Verify VITE_AWS_REGION, access key, secret key, and optional session token.";
    }
    return err.message || defaultMessage;
}

export async function uploadFileToS3(
    file: File,
    areaName: string,
    desarrolloName: string,
    fileType: "pdf" | "video" | "banner" | "gallery" | "thumbnail",
    options?: { targetName?: string },
): Promise<UploadResult> {
    const safeArea = normalizePathSegment(areaName);
    const safeProject = normalizePathSegment(desarrolloName);

    if (!safeProject) {
        return { success: false, error: "Project name is required before uploading media." };
    }

    let body: Uint8Array;
    let s3Path: string;
    let contentType: string;
    let targetName: string;

    if (fileType === "banner") {
        targetName = "banner.jpg";
        s3Path = `${ASSETS_PREFIX}/${safeProject}/${targetName}`;
        contentType = "image/jpeg";
        body = await convertImageToMime(file, "image/jpeg");
    } else if (fileType === "thumbnail") {
        if (!safeArea) return { success: false, error: "Area name is required for thumbnails." };
        targetName = `${safeProject}.webp`;
        s3Path = `${AREAS_PREFIX}/${safeArea}/${targetName}`;
        contentType = "image/webp";
        body = await convertImageToMime(file, "image/webp");
    } else if (fileType === "video") {
        targetName = "video.mp4";
        s3Path = `${ASSETS_PREFIX}/${safeProject}/${targetName}`;
        contentType = file.type || "video/mp4";
        const arrayBuffer = await file.arrayBuffer();
        body = new Uint8Array(arrayBuffer);
    } else if (fileType === "pdf") {
        const rawName = options?.targetName || file.name || "document.pdf";
        targetName = rawName.toLowerCase().endsWith(".pdf") ? rawName : `${rawName}.pdf`;
        s3Path = `${ASSETS_PREFIX}/${safeProject}/pdfs/${targetName}`;
        contentType = "application/pdf";
        const arrayBuffer = await file.arrayBuffer();
        body = new Uint8Array(arrayBuffer);
    } else if (fileType === "gallery") {
        const rawName = options?.targetName || file.name || "image.jpg";
        targetName = rawName.toLowerCase().endsWith(".jpg") ? rawName : `${rawName}.jpg`;
        s3Path = `${ASSETS_PREFIX}/${safeProject}/image-gallery/${targetName}`;
        contentType = "image/jpeg";
        body = await convertImageToMime(file, "image/jpeg");
    } else {
        return { success: false, error: `Unknown file type: ${fileType}` };
    }

    try {
        console.log(`Uploading to S3: bucket=${BUCKET_NAME}, key=${s3Path}, contentType=${contentType}`);
        await putObject(s3Path, body, contentType);

        return {
            success: true,
            key: s3Path,
            targetName,
            url: `https://${BUCKET_NAME}.s3.amazonaws.com/${s3Path}`,
        };
    } catch (error) {
        console.error("S3 upload error:", error);
        console.error("Upload details:", { bucket: BUCKET_NAME, key: s3Path, fileType, fileSize: body.length });
        return {
            success: false,
            error: getFriendlyS3Error(error),
        };
    }
}

export async function listDesarrolloMedia(areaName: string, desarrolloName: string): Promise<MediaFile[]> {
    const safeArea = normalizePathSegment(areaName);
    const safeProject = normalizePathSegment(desarrolloName);
    const prefix = `${ASSETS_PREFIX}/${safeProject}/`;
    const files: MediaFile[] = [];

    try {
        const objects = await listObjects(prefix);

        for (const object of objects) {
            if (!object.key) continue;

            const relativePath = object.key.replace(prefix, "");
            const fileName = relativePath.split("/").pop() || "";

            let type: MediaFile["type"];
            if (relativePath.startsWith("pdfs/")) {
                type = "pdf";
            } else if (relativePath === "video.mp4") {
                type = "video";
            } else if (relativePath === "banner.jpg") {
                type = "banner";
            } else if (relativePath.startsWith("image-gallery/")) {
                type = "gallery";
            } else {
                continue;
            }

            files.push({
                key: object.key,
                name: fileName,
                url: `https://${BUCKET_NAME}.s3.amazonaws.com/${object.key}`,
                type,
                size: object.size,
                lastModified: object.lastModified,
            });
        }

        const thumbnailKey = `${AREAS_PREFIX}/${safeArea}/${safeProject}.webp`;
        const thumbnailObjects = await listObjects(thumbnailKey);
        for (const object of thumbnailObjects) {
            if (object.key === thumbnailKey) {
                files.push({
                    key: object.key,
                    name: `${safeProject}.webp`,
                    url: `https://${BUCKET_NAME}.s3.amazonaws.com/${object.key}`,
                    type: "thumbnail",
                    size: object.size,
                    lastModified: object.lastModified,
                });
            }
        }
    } catch (error) {
        console.error("S3 list error:", error);
    }

    return files;
}

export async function deleteFileFromS3(key: string): Promise<boolean> {
    try {
        await deleteObject(key);
        return true;
    } catch (error) {
        console.error("S3 delete error:", error);
        return false;
    }
}

export async function countGalleryImages(areaName: string, desarrolloName: string): Promise<number> {
    const files = await listDesarrolloMedia(areaName, desarrolloName);
    return files.filter((f) => f.type === "gallery").length;
}

export async function getNextGalleryImageNumber(areaName: string, desarrolloName: string): Promise<number> {
    const files = await listDesarrolloMedia(areaName, desarrolloName);
    const galleryFiles = files.filter((f) => f.type === "gallery");

    let maxNumber = 0;
    for (const file of galleryFiles) {
        const match = file.name.match(/image \((\d+)\)\.jpg/i);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxNumber) maxNumber = num;
        }
    }

    return maxNumber + 1;
}

export async function uploadGalleryImage(
    file: File,
    areaName: string,
    desarrolloName: string,
    imageNumber: number,
): Promise<UploadResult> {
    return uploadFileToS3(file, areaName, desarrolloName, "gallery", {
        targetName: `image (${imageNumber}).jpg`,
    });
}

// ─── Area media (banner, firstImage, carousel) ───────────────────────────────

export interface AreaMediaFile {
    key: string;
    name: string;
    url: string;
    type: "banner" | "firstImage" | "carousel";
    carouselNumber?: number;
    size?: number;
    lastModified?: Date;
}

export async function uploadAreaMedia(
    file: File,
    areaName: string,
    fileType: "banner" | "firstImage" | "carousel",
    options?: { carouselNumber?: number },
): Promise<UploadResult> {
    const safeArea = normalizePathSegment(areaName);
    if (!safeArea) return { success: false, error: "Area name is required." };

    let body: Uint8Array;
    let s3Path: string;
    let contentType: string;
    let targetName: string;

    if (fileType === "banner") {
        targetName = "banner.jpg";
        s3Path = `${AREAS_PREFIX}/${safeArea}/${targetName}`;
        contentType = "image/jpeg";
        body = await convertImageToMime(file, "image/jpeg");
    } else if (fileType === "firstImage") {
        targetName = "firstImage.jpg";
        s3Path = `${AREAS_PREFIX}/${safeArea}/${targetName}`;
        contentType = "image/jpeg";
        body = await convertImageToMime(file, "image/jpeg");
    } else if (fileType === "carousel") {
        const num = options?.carouselNumber ?? 1;
        targetName = `carousel-${num}.jpg`;
        s3Path = `${AREAS_PREFIX}/${safeArea}/${targetName}`;
        contentType = "image/jpeg";
        body = await convertImageToMime(file, "image/jpeg");
    } else {
        return { success: false, error: "Unknown area media type." };
    }

    try {
        console.log(`[S3] Uploading area media: bucket=${BUCKET_NAME}, key=${s3Path}`);
        await putObject(s3Path, body, contentType);
        return {
            success: true,
            key: s3Path,
            targetName,
            url: `https://${BUCKET_NAME}.s3.amazonaws.com/${s3Path}`,
        };
    } catch (error) {
        console.error("[S3] Area upload error:", error);
        return { success: false, error: getFriendlyS3Error(error) };
    }
}

export async function listAreaMedia(areaName: string): Promise<AreaMediaFile[]> {
    const safeArea = normalizePathSegment(areaName);
    const prefix = `${AREAS_PREFIX}/${safeArea}/`;
    const files: AreaMediaFile[] = [];

    try {
        const objects = await listObjects(prefix);
        for (const object of objects) {
            if (!object.key) continue;
            const fileName = object.key.replace(prefix, "");

            // Skip development thumbnails ({desarrolloName}.webp)
            if (fileName.includes("/")) continue;

            let type: AreaMediaFile["type"];
            let carouselNumber: number | undefined;

            if (fileName === "banner.jpg" || fileName === "banner.webp") {
                type = "banner";
            } else if (fileName === "firstImage.jpg" || fileName === "firstImage.webp") {
                type = "firstImage";
            } else {
                const m = fileName.match(/^carousel-(\d+)\.(jpg|webp)$/i);
                if (m) {
                    type = "carousel";
                    carouselNumber = parseInt(m[1], 10);
                } else {
                    continue;
                }
            }

            files.push({
                key: object.key,
                name: fileName,
                url: `https://${BUCKET_NAME}.s3.amazonaws.com/${object.key}`,
                type,
                carouselNumber,
                size: object.size,
                lastModified: object.lastModified,
            });
        }
    } catch (error) {
        console.error("[S3] listAreaMedia error:", error);
    }

    return files;
}

export async function countAreaCarouselImages(areaName: string): Promise<number> {
    const files = await listAreaMedia(areaName);
    return files.filter((f) => f.type === "carousel").length;
}

export async function getNextAreaCarouselNumber(areaName: string): Promise<number> {
    const files = await listAreaMedia(areaName);
    let max = 0;
    for (const f of files) {
        if (f.type === "carousel" && f.carouselNumber && f.carouselNumber > max) max = f.carouselNumber;
    }
    return max + 1;
}
