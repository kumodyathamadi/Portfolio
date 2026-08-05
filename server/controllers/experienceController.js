import Experience from "../models/Experience.js";
import { getDbStatus } from "../config/db.js";
import { getStore, saveStore } from "../data/fallbackStore.js";

export const getExperience = async (req, res) => {
  try {
    if (getDbStatus()) {
      const expList = await Experience.find().sort({ order: 1, createdAt: -1 });
      return res.json(expList);
    }
    const store = getStore();
    return res.json(store.experience || []);
  } catch (error) {
    console.error("[Get Experience Error]", error);
    res.status(500).json({ message: "Failed to fetch experience entries" });
  }
};

export const createExperience = async (req, res) => {
  try {
    const data = req.body;
    if (getDbStatus()) {
      const newExp = await Experience.create(data);
      return res.status(201).json(newExp);
    }

    const store = getStore();
    const newExp = {
      _id: "exp_" + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.experience.push(newExp);
    saveStore(store);
    return res.status(201).json(newExp);
  } catch (error) {
    console.error("[Create Experience Error]", error);
    res.status(500).json({ message: "Failed to create experience entry" });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (getDbStatus()) {
      const updated = await Experience.findByIdAndUpdate(id, data, { new: true });
      if (!updated) return res.status(404).json({ message: "Experience entry not found" });
      return res.json(updated);
    }

    const store = getStore();
    const index = store.experience.findIndex((e) => e._id === id);
    if (index === -1) return res.status(404).json({ message: "Experience entry not found" });
    store.experience[index] = { ...store.experience[index], ...data };
    saveStore(store);
    return res.json(store.experience[index]);
  } catch (error) {
    console.error("[Update Experience Error]", error);
    res.status(500).json({ message: "Failed to update experience entry" });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Experience.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Experience entry not found" });
      return res.json({ message: "Experience entry deleted successfully" });
    }

    const store = getStore();
    const index = store.experience.findIndex((e) => e._id === id);
    if (index === -1) return res.status(404).json({ message: "Experience entry not found" });
    store.experience.splice(index, 1);
    saveStore(store);
    return res.json({ message: "Experience entry deleted successfully" });
  } catch (error) {
    console.error("[Delete Experience Error]", error);
    res.status(500).json({ message: "Failed to delete experience entry" });
  }
};
