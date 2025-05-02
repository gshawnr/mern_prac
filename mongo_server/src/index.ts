import express from "express";
import cors from "cors";

import agentRouter from "./routes/agentRoutes";
import propertyRouter from "./routes/propertyRoutes";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/agents", agentRouter);
app.use("/api/property", propertyRouter);
export default app;
