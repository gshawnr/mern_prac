import express from "express";
import {
  addProperty,
  allProperties,
  deletePropertyById,
} from "../controllers/propertyController";

const router = express.Router();

router.get("/", allProperties);

router.post("/", addProperty);

router.delete("/:id", deletePropertyById);

export default router;
