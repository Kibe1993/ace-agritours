import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log("✅ .env loaded");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../public/Stories.mp4");
console.log("📂 Resolved file path:", filePath);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("🚀 Starting upload...");
cloudinary.uploader.upload_large(filePath, {
    resource_type: "video",
    chunk_size: 6 * 1024 * 1024,
}, (error, result) => {
    if (error) {
        console.error("❌ Upload failed:", error);
    }
    else {
        console.log("✅ Upload succeeded!");
        console.log("Video URL:", result?.secure_url);
    }
});
