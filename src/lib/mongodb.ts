import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isConnected: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  isConnected: false
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<{ isConnected: boolean }> {
  if (cached.conn && cached.isConnected) {
    return { isConnected: true };
  }

  if (!MONGODB_URI) {
    // Graceful indicator when MongoDB is running in memory fallback mode
    return { isConnected: false };
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      cached.isConnected = true;
      return m;
    }).catch((err) => {
      cached.promise = null;
      cached.isConnected = false;
      console.warn("MongoDB connection notice (will use persistent memory store fallback):", err.message);
      return null as unknown as typeof mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return { isConnected: Boolean(cached.conn && cached.isConnected) };
  } catch (e) {
    cached.isConnected = false;
    return { isConnected: false };
  }
}
