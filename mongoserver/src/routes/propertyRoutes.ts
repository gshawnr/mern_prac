import express from "express";
import { addProperty, allProperties } from "../controllers/propertyController";

const router = express.Router();

router.get("/", allProperties);

router.post("/", addProperty);

export default router;
