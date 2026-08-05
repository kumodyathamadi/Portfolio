import Profile from "../models/Profile.js";
import { getDbStatus } from "../config/db.js";
import { getStore, saveStore } from "../data/fallbackStore.js";

export const getProfile = async (req, res) => {
  try {
    if (getDbStatus()) {
      let profile = await Profile.findOne();
      if (!profile) {
        const store = getStore();
        profile = await Profile.create(store.profile);
      }
      return res.json(profile);
    }
    const store = getStore();
    return res.json(store.profile);
  } catch (error) {
    console.error("[Get Profile Error]", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updateData = req.body;
    if (getDbStatus()) {
      let profile = await Profile.findOne();
      if (profile) {
        profile = await Profile.findByIdAndUpdate(profile._id, updateData, { new: true });
      } else {
        profile = await Profile.create(updateData);
      }
      return res.json(profile);
    }

    const store = getStore();
    store.profile = { ...store.profile, ...updateData };
    saveStore(store);
    return res.json(store.profile);
  } catch (error) {
    console.error("[Update Profile Error]", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
