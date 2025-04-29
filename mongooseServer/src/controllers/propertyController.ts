import { Request, Response, NextFunction } from "express";
import Property from "../models/Property";
import Agent from "../models/Agent";
import mongoose, { Types, Schema } from "mongoose";

type queryFilter = {
  province?: string;
  agent?: Types.ObjectId;
};

export const getProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { query } = req;
    const { province, agentId } = query;

    let filter: queryFilter = {};

    if (province || agentId) {
      if (province && typeof province === "string") filter.province = province;
      if (
        agentId &&
        typeof agentId === "string" &&
        Types.ObjectId.isValid(agentId)
      )
        filter.agent = new Types.ObjectId(agentId);
    }

    const properties = await Property.find(filter);

    if (!properties) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(properties);
  } catch (e) {
    const message = (e as Error).message || "";
    console.log(`getProperty error: ${message}`);
    res.status(500).json({ message });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid property id" });
      return;
    }

    const property = await Property.findById(id);

    if (!property) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(property);
  } catch (e) {
    const msg = (e as Error).message;
    console.log(`getPropertyById errro: ${msg}`);
    res.status(500).json({ message: `server error: ${msg} ` });
  }
};

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;

    // fetch the listing agent id
    const agent = await Agent.findOne({
      email: body.agentEmail,
    }).select("_id");

    if (!agent) {
      res.status(404).json({ message: "listing agent not found" });
      return;
    }

    // create the property
    const propertyDetails = {
      street: body.street,
      city: body.city,
      province: body.province,
      agent: agent._id,
    };

    const property = new Property(propertyDetails);
    const dbRes = await property.save();

    res.status(201).json(dbRes);
  } catch (e) {
    const msg = (e as Error).message;
    console.log(`createProperty error: ${msg}`);
  }
};
