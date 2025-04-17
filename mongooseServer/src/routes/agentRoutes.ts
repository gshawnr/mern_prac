import express from "express";
import {
  updateAgent,
  getAgents,
  createAgent,
  deleteAgent,
} from "../controllers/agentController";

const Router = express.Router();

// GET
Router.get("/", getAgents);

// POST
Router.post("/", createAgent);

// PATCh
Router.patch("/", updateAgent);

// DELETE
Router.delete("/", deleteAgent);
export default Router;
