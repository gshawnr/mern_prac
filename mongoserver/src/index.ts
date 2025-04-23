import express from "express";
import cors from "cors";

import agentRouter from "./routes/agentRoutes";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/agents", agentRouter);
export default app;
