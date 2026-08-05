import Project from "../models/Project.js";
import { getDbStatus } from "../config/db.js";
import { getStore, saveStore } from "../data/fallbackStore.js";

export const getProjects = async (req, res) => {
  try {
    const { search, category, tech } = req.query;

    if (getDbStatus()) {
      let query = {};
      if (category && category !== "All") {
        query.category = { $regex: category, $options: "i" };
      }
      if (tech && tech !== "All") {
        query.technologies = { $regex: tech, $options: "i" };
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { subtitle: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { technologies: { $regex: search, $options: "i" } },
        ];
      }

      const projects = await Project.find(query).sort({ featured: -1, order: 1, createdAt: -1 });
      return res.json(projects);
    }

    const store = getStore();
    let results = [...(store.projects || [])];

    if (category && category !== "All") {
      results = results.filter((p) =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (tech && tech !== "All") {
      results = results.filter((p) =>
        p.technologies?.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.technologies?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return res.json(results);
  } catch (error) {
    console.error("[Get Projects Error]", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ message: "Project not found" });
      return res.json(project);
    }

    const store = getStore();
    const project = store.projects.find((p) => p._id === id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error getting project" });
  }
};

export const createProject = async (req, res) => {
  try {
    const data = req.body;
    if (getDbStatus()) {
      const newProject = await Project.create(data);
      return res.status(201).json(newProject);
    }

    const store = getStore();
    const newProject = {
      _id: "proj_" + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.projects.unshift(newProject);
    saveStore(store);
    return res.status(201).json(newProject);
  } catch (error) {
    console.error("[Create Project Error]", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (getDbStatus()) {
      const updated = await Project.findByIdAndUpdate(id, data, { new: true });
      if (!updated) return res.status(404).json({ message: "Project not found" });
      return res.json(updated);
    }

    const store = getStore();
    const index = store.projects.findIndex((p) => p._id === id);
    if (index === -1) return res.status(404).json({ message: "Project not found" });
    store.projects[index] = { ...store.projects[index], ...data };
    saveStore(store);
    return res.json(store.projects[index]);
  } catch (error) {
    console.error("[Update Project Error]", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Project not found" });
      return res.json({ message: "Project deleted successfully" });
    }

    const store = getStore();
    const index = store.projects.findIndex((p) => p._id === id);
    if (index === -1) return res.status(404).json({ message: "Project not found" });
    store.projects.splice(index, 1);
    saveStore(store);
    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("[Delete Project Error]", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
