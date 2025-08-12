import mongoose, { Connection } from "mongoose";

// ✅ Import models so they get registered every time DB connects
import "@/lib/Models/planned";
import "@/lib/Models/bookings";
import "@/lib/Models/blog";
import "@/lib/Models/farmvisit";
import "@/lib/Models/Newsletter";
import "@/lib/Models/partner";
import "@/lib/Models/testimonials";
import "@/lib/Models/WhyUs";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

export async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "AceAgritours",
    });
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;
    console.log("DB Connected to:", cached.conn.name);
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  global.mongoose = cached;

  if (!cached.conn) {
    throw new Error("Failed to establish a database connection.");
  }

  return cached.conn;
}
