// Vercel serverless function — keeps AWS credentials on the server.
//
// The browser never receives AWS keys: it asks this endpoint for a short-lived
// presigned PUT URL (uploads), or has this endpoint list/delete objects.
//
// Required server-side env vars on Vercel (NOT prefixed with VITE_, so they are
// never exposed to the client bundle):
//   AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET
//   (optional) AWS_SESSION_TOKEN
//
// Falls back to the VITE_* names so an existing .env keeps working locally.
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION || process.env.VITE_AWS_REGION || "us-east-1";
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || process.env.VITE_AWS_ACCESS_KEY_ID || "";
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || process.env.VITE_AWS_SECRET_ACCESS_KEY || "";
const SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || process.env.VITE_AWS_SESSION_TOKEN || undefined;
const BUCKET = process.env.S3_BUCKET || process.env.VITE_S3_BUCKET || "pagina-mama";

// Only allow writes/deletes inside the media tree, so a leaked endpoint cannot
// be used to overwrite arbitrary bucket objects.
const ALLOWED_PREFIX = "assets2/";

function getClient() {
    if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) return null;
    return new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
            ...(SESSION_TOKEN ? { sessionToken: SESSION_TOKEN } : {}),
        },
    });
}

function isAllowedKey(key) {
    return typeof key === "string" && key.startsWith(ALLOWED_PREFIX) && !key.includes("..");
}

async function readJsonBody(req) {
    if (req.body && typeof req.body === "object") return req.body;
    if (typeof req.body === "string" && req.body.length) {
        try { return JSON.parse(req.body); } catch { return {}; }
    }
    return await new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
            try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); }
        });
        req.on("error", () => resolve({}));
    });
}

export default async function handler(req, res) {
    const client = getClient();
    if (!client) {
        res.status(500).json({ error: "S3 is not configured on the server." });
        return;
    }

    const action = (req.query?.action || "").toString();

    try {
        if (req.method === "GET" && action === "list") {
            const prefix = (req.query?.prefix || "").toString();
            if (!prefix.startsWith(ALLOWED_PREFIX)) {
                res.status(400).json({ error: "Invalid prefix." });
                return;
            }
            const out = await client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }));
            res.status(200).json({
                bucket: BUCKET,
                objects: (out.Contents || []).map((o) => ({
                    key: o.Key,
                    size: o.Size,
                    lastModified: o.LastModified,
                })),
            });
            return;
        }

        if (req.method === "POST" && action === "presign") {
            const { key, contentType } = await readJsonBody(req);
            if (!isAllowedKey(key)) {
                res.status(400).json({ error: "Invalid or disallowed key." });
                return;
            }
            const url = await getSignedUrl(
                client,
                new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType || "application/octet-stream" }),
                { expiresIn: 120 },
            );
            res.status(200).json({ url, key, bucket: BUCKET });
            return;
        }

        if (req.method === "POST" && action === "delete") {
            const { key } = await readJsonBody(req);
            if (!isAllowedKey(key)) {
                res.status(400).json({ error: "Invalid or disallowed key." });
                return;
            }
            await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
            res.status(200).json({ ok: true });
            return;
        }

        res.status(400).json({ error: "Unknown action." });
    } catch (error) {
        console.error("[api/s3] error:", error);
        res.status(500).json({ error: error?.message || "S3 request failed." });
    }
}

