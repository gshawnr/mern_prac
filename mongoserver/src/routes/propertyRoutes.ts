import express from "express";
import {
  addProperty,
  allProperties,
  deletePropertyById,
} from "../controllers/propertyController";

const router = express.Router();

// GET
router.get("/", allProperties);
// router.get("/:id", getById) // TODO

// POST
router.post("/", addProperty);

// PATCH
// router.patch("/:id", updateProperty)

// DELETE
router.delete("/:id", deletePropertyById);

export default router;
