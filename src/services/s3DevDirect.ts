// DEV-ONLY direct S3 access.
//
// This module is dynamically imported ONLY inside an `import.meta.env.DEV`
// branch in `s3.ts`. In production builds that branch is statically removed by
// Vite, so this file — and the AWS SDK + credentials it pulls in — is never
// included in the client bundle. It lets `npm run dev` keep working against S3
// without needing `vercel dev` running the serverless function.
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const REGION = (import.meta.env.VITE_AWS_REGION || "us-east-1").trim() || "us-east-1";
const ACCESS_KEY_ID = (import.meta.env.VITE_AWS_ACCESS_KEY_ID || "").trim();
const SECRET_ACCESS_KEY = (import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "").trim();
const SESSION_TOKEN = (import.meta.env.VITE_AWS_SESSION_TOKEN || "").trim() || undefined;
const BUCKET = (import.meta.env.VITE_S3_BUCKET || "pagina-mama").trim();

const client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        ...(SESSION_TOKEN ? { sessionToken: SESSION_TOKEN } : {}),
    },
});

export interface DevS3Object {
    key: string;
    size?: number;
    lastModified?: Date;
}

export async function devPutObject(key: string, body: Uint8Array, contentType: string): Promise<void> {
    await client.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
}

export async function devListObjects(prefix: string): Promise<DevS3Object[]> {
    const out = await client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }));
    return (out.Contents || []).map((o) => ({ key: o.Key as string, size: o.Size, lastModified: o.LastModified }));
}

export async function devDeleteObject(key: string): Promise<void> {
    await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

