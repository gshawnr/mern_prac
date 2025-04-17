import express from "express";
import {
  getProperty,
  createProperty,
  getPropertyById,
  getPropertyByQuery,
} from "../controllers/propertyController";

const Router = express.Router();

// GET
Router.get("/", getProperty);
Router.get("/query", getPropertyByQuery);
Router.get("/:id", getPropertyById);

// POST
Router.post("/", createProperty);

export default Router;
