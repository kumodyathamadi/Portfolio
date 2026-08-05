import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    description: { type: String, default: "" },
    issueDate: { type: String, default: "" },
    certificateId: { type: String, default: "" },
    verificationUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    category: { type: String, default: "General" },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
