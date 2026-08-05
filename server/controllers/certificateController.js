import Certificate from "../models/Certificate.js";
import { getDbStatus } from "../config/db.js";
import { getStore, saveStore } from "../data/fallbackStore.js";

export const getCertificates = async (req, res) => {
  try {
    const { search, issuer, year } = req.query;

    if (getDbStatus()) {
      let query = {};
      if (issuer && issuer !== "All") {
        query.issuer = { $regex: issuer, $options: "i" };
      }
      if (year && year !== "All") {
        query.issueDate = { $regex: year, $options: "i" };
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { issuer: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const certs = await Certificate.find(query).sort({ featured: -1, createdAt: -1 });
      return res.json(certs);
    }

    const store = getStore();
    let results = [...(store.certificates || [])];

    if (issuer && issuer !== "All") {
      results = results.filter((c) =>
        c.issuer?.toLowerCase().includes(issuer.toLowerCase())
      );
    }

    if (year && year !== "All") {
      results = results.filter((c) => c.issueDate?.includes(year));
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.issuer?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      );
    }

    return res.json(results);
  } catch (error) {
    console.error("[Get Certificates Error]", error);
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const data = req.body;
    if (getDbStatus()) {
      const newCert = await Certificate.create(data);
      return res.status(201).json(newCert);
    }

    const store = getStore();
    const newCert = {
      _id: "cert_" + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.certificates.unshift(newCert);
    saveStore(store);
    return res.status(201).json(newCert);
  } catch (error) {
    console.error("[Create Certificate Error]", error);
    res.status(500).json({ message: "Failed to create certificate" });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (getDbStatus()) {
      const updated = await Certificate.findByIdAndUpdate(id, data, { new: true });
      if (!updated) return res.status(404).json({ message: "Certificate not found" });
      return res.json(updated);
    }

    const store = getStore();
    const index = store.certificates.findIndex((c) => c._id === id);
    if (index === -1) return res.status(404).json({ message: "Certificate not found" });
    store.certificates[index] = { ...store.certificates[index], ...data };
    saveStore(store);
    return res.json(store.certificates[index]);
  } catch (error) {
    console.error("[Update Certificate Error]", error);
    res.status(500).json({ message: "Failed to update certificate" });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Certificate.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Certificate not found" });
      return res.json({ message: "Certificate deleted successfully" });
    }

    const store = getStore();
    const index = store.certificates.findIndex((c) => c._id === id);
    if (index === -1) return res.status(404).json({ message: "Certificate not found" });
    store.certificates.splice(index, 1);
    saveStore(store);
    return res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("[Delete Certificate Error]", error);
    res.status(500).json({ message: "Failed to delete certificate" });
  }
};
