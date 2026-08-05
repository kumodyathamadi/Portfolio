import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    duration: { type: String, required: true },
    achievements: [{ type: String }],
    logo: { type: String, default: "" },
    badge: { type: String, default: "" },
    location: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model("Education", educationSchema);
