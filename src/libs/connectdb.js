import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/";

if (!MONGODB_URI) {
    throw new Error("⚠️ Please define the MONGODB_URI environment variable in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function dbConnect() {
    console.log("🔄 Attempting to connect to MongoDB...");

    if (cached.conn) {
        console.log("✅ Using existing MongoDB connection.");
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => {
            console.log("✅ Database connected successfully!");
            return mongoose;
        }).catch((err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

// 🔥 Force test connection on app start
dbConnect().then(() => console.log("✅ MongoDB Test Connection Established!")).catch((err) => console.error("❌ MongoDB Test Connection Failed:", err));
