import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import Skill from "../models/Skill.js";
import Education from "../models/Education.js";
import Experience from "../models/Experience.js";
import { getDbStatus } from "../config/db.js";
import { getStore } from "../data/fallbackStore.js";

export const getDashboardStats = async (req, res) => {
  try {
    if (getDbStatus()) {
      const [totalProjects, totalCertificates, totalSkills, totalEducation, totalExperience, recentProjects] =
        await Promise.all([
          Project.countDocuments(),
          Certificate.countDocuments(),
          Skill.countDocuments(),
          Education.countDocuments(),
          Experience.countDocuments(),
          Project.find().sort({ createdAt: -1 }).limit(5),
        ]);

      return res.json({
        counts: {
          projects: totalProjects,
          certificates: totalCertificates,
          skills: totalSkills,
          education: totalEducation,
          experience: totalExperience,
        },
        recentUpdates: recentProjects,
      });
    }

    const store = getStore();
    return res.json({
      counts: {
        projects: store.projects?.length || 0,
        certificates: store.certificates?.length || 0,
        skills: store.skills?.length || 0,
        education: store.education?.length || 0,
        experience: store.experience?.length || 0,
      },
      recentUpdates: store.projects?.slice(0, 5) || [],
    });
  } catch (error) {
    console.error("[Stats Error]", error);
    res.status(500).json({ message: "Failed to fetch dashboard statistics" });
  }
};
