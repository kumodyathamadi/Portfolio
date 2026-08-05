import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    summary: { type: String, default: "" },
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    logo: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
