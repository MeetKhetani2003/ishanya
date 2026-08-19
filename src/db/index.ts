import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("DATABASE_URL is not set. Database features will fail and fall back to static data.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!databaseUrl) return;

  if (!cached.promise) {
    cached.promise = mongoose.connect(databaseUrl, { bufferCommands: false }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
};
