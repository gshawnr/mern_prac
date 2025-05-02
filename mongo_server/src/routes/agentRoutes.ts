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
router.get("/:id", getAgentWithId);

// POST
router.post("/", createAgent);

// PATCH
router.patch("/:id", updateAgent);

// DELETE
router.delete("/:id", deleteAgentWithId);
export default router;
