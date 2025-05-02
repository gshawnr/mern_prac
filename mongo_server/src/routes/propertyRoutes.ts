import express from "express";
import {
  addProperty,
  allProperties,
  deletePropertyById,
  getPropertyById,
  editProperty,
} from "../controllers/propertyController";

const router = express.Router();

// GET
router.get("/", allProperties);
router.get("/:id", getPropertyById);

// POST
router.post("/", addProperty);

// PATCH
router.patch("/:id", editProperty);

// DELETE
router.delete("/:id", deletePropertyById);

export default router;
