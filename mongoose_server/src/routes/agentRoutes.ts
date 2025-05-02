import express from "express";
import {
  updateAgent,
  getAgents,
  createAgent,
  deleteAgent,
  getAgentById,
} from "../controllers/agentController";

const router = express.Router();

// GET
router.get("/", getAgents);
router.get("/:id", getAgentById);

// POST
router.post("/", createAgent);

// PATCh
router.patch("/:id", updateAgent);

// DELETE
router.delete("/:id", deleteAgent);

export default router;
