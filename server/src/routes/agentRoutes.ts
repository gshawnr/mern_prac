import express from "express";
import { createAgent, getAgent } from "../controllers/agentController";

const router = express.Router();

// GET
router.get("/", getAgent);

// POST
router.post("/", createAgent);

export default router;
