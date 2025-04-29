import express from "express";
import {
  getProperty,
  createProperty,
  getPropertyById,
} from "../controllers/propertyController";

const router = express.Router();

// GET
router.get("/", getProperty);
router.get("/:id", getPropertyById);

// POST
router.post("/", createProperty);

// PATCH
// router.patch("/:id", updateProperty) // TODO

// DELETE
// router.delete("/:id", deleteById) // TODO

export default router;
