import express from "express";
import {
  getProperty,
  createProperty,
  getPropertyById,
  deleteProperty,
  editProperty,
} from "../controllers/propertyController";

const router = express.Router();

// GET
router.get("/", getProperty);
router.get("/:id", getPropertyById);

// POST
router.post("/", createProperty);

// PATCH
router.patch("/:id", editProperty);

// DELETE
router.delete("/:id", deleteProperty);

export default router;
