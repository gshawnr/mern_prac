import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import propertyRoutes from "./routes/propertyRoutes";
import agentRoutes from "./routes/agentRoutes";

const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

// Property routes
app.use("/api/property", propertyRoutes);
app.use("/api/agent", agentRoutes);

export default app;
