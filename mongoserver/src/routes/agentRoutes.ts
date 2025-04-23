import express from "express";
import {
  getAgents,
  addAgent,
  getAgentWithId,
  deleteAgentWithId,
} from "../controllers/agentsController";

const router = express.Router();

// Agent routes
router.get("/", getAgents);
router.get("/:agentId", getAgentWithId);
router.post("/", addAgent);
router.delete("/:agentId", deleteAgentWithId);
export default router;
