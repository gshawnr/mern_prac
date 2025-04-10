import express from "express";
import { createProperty, getProperty } from "../controllers/propertyController";

const router = express.Router();

// GET route to fetch Properties
router.get("/", getProperty);

// POST route to create Property
router.post("/", createProperty);

export default router;
