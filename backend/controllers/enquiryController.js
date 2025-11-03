import { validationResult } from "express-validator";
import Enquiry from "../models/Enquiry.js";

// Public API
export const createEnquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, course_interest } = req.body;
  try {
    const enquiry = await Enquiry.create({ name, email, phone, course_interest });
    res.status(201).json({ id: enquiry._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Authenticated APIs
export const getUnclaimedLeads = async (req, res) => {
  try {
    const leads = await Enquiry.find({ status: "public" }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const claimLead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    if (enquiry.status === "claimed") return res.status(409).json({ message: "Already claimed" });

    enquiry.status = "claimed";
    enquiry.claimed_by = req.user.id;
    await enquiry.save();

    res.json({ message: "Enquiry claimed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getClaimedLeads = async (req, res) => {
  try {
    const leads = await Enquiry.find({ status: "claimed", claimed_by: req.user.id }).populate("claimed_by", "name email");
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
