import Education from "../models/Education.js";
import { getDbStatus } from "../config/db.js";
import { getStore, saveStore } from "../data/fallbackStore.js";

export const getEducation = async (req, res) => {
  try {
    if (getDbStatus()) {
      const eduList = await Education.find().sort({ order: 1, createdAt: 1 });
      return res.json(eduList);
    }
    const store = getStore();
    return res.json(store.education || []);
  } catch (error) {
    console.error("[Get Education Error]", error);
    res.status(500).json({ message: "Failed to fetch education entries" });
  }
};

export const createEducation = async (req, res) => {
  try {
    const data = req.body;
    if (getDbStatus()) {
      const newEdu = await Education.create(data);
      return res.status(201).json(newEdu);
    }

    const store = getStore();
    const newEdu = {
      _id: "edu_" + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.education.push(newEdu);
    saveStore(store);
    return res.status(201).json(newEdu);
  } catch (error) {
    console.error("[Create Education Error]", error);
    res.status(500).json({ message: "Failed to create education entry" });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (getDbStatus()) {
      const updated = await Education.findByIdAndUpdate(id, data, { new: true });
      if (!updated) return res.status(404).json({ message: "Education entry not found" });
      return res.json(updated);
    }

    const store = getStore();
    const index = store.education.findIndex((e) => e._id === id);
    if (index === -1) return res.status(404).json({ message: "Education entry not found" });
    store.education[index] = { ...store.education[index], ...data };
    saveStore(store);
    return res.json(store.education[index]);
  } catch (error) {
    console.error("[Update Education Error]", error);
    res.status(500).json({ message: "Failed to update education entry" });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Education.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Education entry not found" });
      return res.json({ message: "Education entry deleted successfully" });
    }

    const store = getStore();
    const index = store.education.findIndex((e) => e._id === id);
    if (index === -1) return res.status(404).json({ message: "Education entry not found" });
    store.education.splice(index, 1);
    saveStore(store);
    return res.json({ message: "Education entry deleted successfully" });
  } catch (error) {
    console.error("[Delete Education Error]", error);
    res.status(500).json({ message: "Failed to delete education entry" });
  }
};
