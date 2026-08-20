import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/db";
import mongoose from "mongoose";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let objectId: mongoose.Types.ObjectId;
  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid image id" }, { status: 400 });
  }

  await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) {
    return NextResponse.json({ error: "DB not ready" }, { status: 503 });
  }

  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "images" });

  // Find file metadata to get content-type
  const files = await bucket.find({ _id: objectId }).toArray();
  if (!files.length) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const fileDoc = files[0];
  const contentType: string =
    (fileDoc as any).metadata?.contentType ?? "application/octet-stream";

  // Stream from GridFS into a ReadableStream for the Response
  const downloadStream = bucket.openDownloadStream(objectId);

  const webStream = new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) => controller.enqueue(chunk));
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (err) => controller.error(err));
    },
  });

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      // Cache aggressively — GridFS files are immutable (new upload = new ID)
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
