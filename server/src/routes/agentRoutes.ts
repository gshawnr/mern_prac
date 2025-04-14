import express from "express";
import {
  createAgent,
  getAgent,
  getAgentByEmail,
} from "../controllers/agentController";

const router = express.Router();

// GET
router.get("/", getAgent);
router.get("/:email", getAgentByEmail);

// POST
router.post("/", createAgent);

export default router;
