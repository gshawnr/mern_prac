import express from "express";
import cors from "cors";

import PropertyRoutes from "./routes/propertyRoutes";
import AgentRoutes from "./routes/agentRoutes";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/property", PropertyRoutes);
app.use("/api/agent", AgentRoutes);

export default app;
