import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // If Cloudinary environment variables are present, upload directly to Cloudinary!
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio_uploads",
        resource_type: "auto",
      });

      // Clean up local temp file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.json({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    // Otherwise, serve from local /uploads directory
    const relativeUrl = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get("host")}${relativeUrl}`;

    return res.json({
      url: relativeUrl,
      fullUrl: fullUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("[Upload Controller Error]", error);
    res.status(500).json({ message: "File upload failed: " + error.message });
  }
};
