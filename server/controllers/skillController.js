import Skill from "../models/Skill.js";
import { getDbStatus } from "../config/db.js";
import { getStore, saveStore } from "../data/fallbackStore.js";

export const getSkills = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (getDbStatus()) {
      let query = {};
      if (category && category !== "All") {
        query.category = { $regex: category, $options: "i" };
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ];
      }

      const skills = await Skill.find(query).sort({ order: 1, createdAt: 1 });
      return res.json(skills);
    }

    const store = getStore();
    let results = [...(store.skills || [])];
    if (category && category !== "All") {
      results = results.filter((s) => s.category?.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) => s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)
      );
    }

    return res.json(results);
  } catch (error) {
    console.error("[Get Skills Error]", error);
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

export const createSkill = async (req, res) => {
  try {
    const data = req.body;
    if (getDbStatus()) {
      const newSkill = await Skill.create(data);
      return res.status(201).json(newSkill);
    }

    const store = getStore();
    const newSkill = {
      _id: "skill_" + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.skills.push(newSkill);
    saveStore(store);
    return res.status(201).json(newSkill);
  } catch (error) {
    console.error("[Create Skill Error]", error);
    res.status(500).json({ message: "Failed to create skill" });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (getDbStatus()) {
      const updated = await Skill.findByIdAndUpdate(id, data, { new: true });
      if (!updated) return res.status(404).json({ message: "Skill not found" });
      return res.json(updated);
    }

    const store = getStore();
    const index = store.skills.findIndex((s) => s._id === id);
    if (index === -1) return res.status(404).json({ message: "Skill not found" });
    store.skills[index] = { ...store.skills[index], ...data };
    saveStore(store);
    return res.json(store.skills[index]);
  } catch (error) {
    console.error("[Update Skill Error]", error);
    res.status(500).json({ message: "Failed to update skill" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Skill.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Skill not found" });
      return res.json({ message: "Skill deleted successfully" });
    }

    const store = getStore();
    const index = store.skills.findIndex((s) => s._id === id);
    if (index === -1) return res.status(404).json({ message: "Skill not found" });
    store.skills.splice(index, 1);
    saveStore(store);
    return res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("[Delete Skill Error]", error);
    res.status(500).json({ message: "Failed to delete skill" });
  }
};
