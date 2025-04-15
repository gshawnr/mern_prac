import express from "express";
import cors from "cors";

import agentRoutes from "./routes/agentRoutes";
import propertyRoutes from "./routes/propertyRoutes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routing
app.use("/api/property", propertyRoutes);
app.use("/api/agent", agentRoutes);

export default app;
