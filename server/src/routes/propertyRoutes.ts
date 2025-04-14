import express from "express";
import {
  createProperty,
  getProperty,
  getPropertyById,
  deletePropertyById,
  updatePropertyById,
  updateProperty,
} from "../controllers/propertyController";

const router = express.Router();

// GET route to fetch Properties
router.get("/", getProperty);
router.get("/:id", getPropertyById);

// POST route to create Property
router.post("/", createProperty);

// PUT update routes
router.patch("/:id", updatePropertyById);
router.patch("/", updateProperty);

// DELETE
router.delete("/:id", deletePropertyById);

export default router;
