import { Request, Response, NextFunction } from "express";
import Property from "../models/Property";
import Agent from "../models/Agent";
import mongoose, { Schema } from "mongoose";

export const getProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const properties = await Property.find({}).populate("listingAgent");

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

    const property = await Property.findById(id).populate("listingAgent");

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

export const getPropertyByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { query } = req;
    const { agentEmail, province } = query;

    const properties = await Property.aggregate([
      {
        $lookup: {
          from: "agents", // must match the collection name in MongoDB (usually lowercase plural)
          localField: "listingAgent",
          foreignField: "_id",
          as: "listingAgent",
        },
      },
      {
        $unwind: "$listingAgent", // flatten the array from $lookup
      },
      {
        $match: {
          $or: [
            { "listingAgent.email": agentEmail }, // filter on agent field
            { "address.province": province }, // filter on province field
          ],
        },
      },
      {
        $project: {
          address: 1,
          listingAgent: {
            email: 1,
            firstName: 1,
            lastName: 1,
          },
        },
      },
    ]);

    if (!properties) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(properties);
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
      address: {
        street: body.street,
        city: body.city,
        province: body.province,
      },
      listingAgent: agent._id,
    };

    const property = new Property(propertyDetails);
    const dbRes = await property.save();

    res.status(201).json(dbRes);
  } catch (e) {
    const msg = (e as Error).message;
    console.log(`createProperty error: ${msg}`);
  }
};
