import express from "express";
import {
  getAgents,
  createAgent,
  getAgentWithId,
  deleteAgentWithId,
  updateAgent,
} from "../controllers/agentsController";

const router = express.Router();

// GET
router.get("/", getAgents);
router.get("/:agentId", getAgentWithId);

// POST
router.post("/", createAgent);

// PATCH
router.patch("/:agentId", updateAgent);

// DELETE
router.delete("/:agentId", deleteAgentWithId);
export default router;
