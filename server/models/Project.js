import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    category: { type: String, default: "Full-Stack" },
    technologies: [{ type: String }],
    bullets: [{ type: String }],
    image: { type: String, default: "" },
    images: [{ type: String }],
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    completionDate: { type: Date, default: Date.now },
    featured: { type: Boolean, default: true },
    status: { type: String, default: "Completed", enum: ["Completed", "In Progress", "Planned"] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
