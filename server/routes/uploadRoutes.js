import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadFile } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Configure local temporary / upload storage
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|gif|webp|svg|pdf/;
  const ext = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedExtensions.test(file.mimetype) || file.mimetype === "application/pdf";

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpg, png, webp, svg) and PDF documents are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

router.post("/", protect, upload.single("file"), uploadFile);

export default router;
