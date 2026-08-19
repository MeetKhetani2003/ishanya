import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("DATABASE_URL is not set. Database features will fail and fall back to static data.");
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;
  if (!databaseUrl) return;

  try {
    const db = await mongoose.connect(databaseUrl);
    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
