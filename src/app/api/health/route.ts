import { connectToDatabase } from "@/db";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    // simple health check using mongoose connection state
    const ok = mongoose.connection.readyState === 1;
    return Response.json({ ok });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
