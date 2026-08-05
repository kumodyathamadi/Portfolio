import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: "Full-Stack Developer" },
    about: { type: String, default: "" },
    image: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "Colombo, Sri Lanka" },
    resumeUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);
