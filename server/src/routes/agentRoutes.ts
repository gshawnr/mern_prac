import express from "express";
import { getAgents, createAgent } from "../controllers/agentController";

const Router = express.Router();

// GET
Router.get("/", getAgents);

// POST
Router.post("/", createAgent);

export default Router;
