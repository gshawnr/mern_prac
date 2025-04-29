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
router.get("/:agentId", getAgentById);

// POST
router.post("/", createAgent);

// PATCh
router.patch("/:agentId", updateAgent); // FIX

// DELETE
// Router.delete("/", deleteAgent);
router.delete("/:agentId", deleteAgent); // TODO
export default router;
