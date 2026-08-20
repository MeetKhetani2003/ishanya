import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/db";
import mongoose from "mongoose";
import { jwtVerify } from "jose";
import { Readable } from "stream";

const getJwtSecretKey = () => {
  const secret = process.env.ADMIN_SECRET;
  return secret || "fallback-dev-secret-key-do-not-use-in-prod";
};

/** Verify the admin_session cookie carried in the request */
async function isAuthorized(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get("admin_session");
  if (!cookie) return false;
  try {
    await jwtVerify(cookie.value, new TextEncoder().encode(getJwtSecretKey()));
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const filename =
    (file as any).name ?? `upload-${Date.now()}`;
  const contentType = file.type || "application/octet-stream";

  // Read the file into a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) {
    return NextResponse.json({ error: "DB not ready" }, { status: 503 });
  }

  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "images" });

  // Upload into GridFS
  const fileId = new mongoose.Types.ObjectId();
  const uploadStream = bucket.openUploadStreamWithId(fileId, filename, {
    metadata: { contentType },
  });

  await new Promise<void>((resolve, reject) => {
    const readable = Readable.from(buffer);
    readable.pipe(uploadStream);
    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
    readable.on("error", reject);
  });

  const url = `/api/images/${fileId.toString()}`;
  return NextResponse.json({ id: fileId.toString(), url }, { status: 200 });
}
