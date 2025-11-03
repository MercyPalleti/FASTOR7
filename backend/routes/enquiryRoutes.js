import express from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createEnquiry, getUnclaimedLeads, claimLead, getClaimedLeads } from "../controllers/enquiryController.js";

const router = express.Router();

// Public
router.post("/public", [ body("name").notEmpty() ], createEnquiry);

// Authenticated
router.get("/unclaimed", authMiddleware, getUnclaimedLeads);
router.post("/:id/claim", authMiddleware, claimLead);
router.get("/claimed", authMiddleware, getClaimedLeads);

export default router;
