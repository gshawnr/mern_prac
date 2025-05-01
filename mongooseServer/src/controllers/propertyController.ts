import { Request, Response, NextFunction } from "express";
import Property from "../models/Property";
import Agent from "../models/Agent";
import mongoose, { Types, Schema } from "mongoose";

type queryFilter = {
  city?: string;
  province?: string;
  agentId?: Types.ObjectId;
};

type editFilter = {
  street?: string;
  city?: string;
  province?: string;
  agentId?: Types.ObjectId;
};

export const getProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { query } = req;
    const { city, province, agentId } = query;

    let filter: queryFilter = {};

    if (city || province || agentId) {
      if (city && typeof city === "string") filter.city = city;
      if (province && typeof province === "string") filter.province = province;
      if (
        agentId &&
        typeof agentId === "string" &&
        Types.ObjectId.isValid(agentId)
      )
        filter.agentId = new Types.ObjectId(agentId);
    }

    const properties = await Property.find(filter);

    // if (!properties) {
    //   res.status(404).json(properties);
    //   return;
    // }

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
      agentId: agent._id,
    };

    const property = new Property(propertyDetails);
    const dbRes = await property.save();

    res.status(201).json(dbRes);
  } catch (e) {
    const msg = (e as Error).message;
    console.log(`createProperty error: ${msg}`);
  }
};

export const editProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    const { id } = params;
    const { street, city, province, agentId } = body;

    if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid property ID" });
      return;
    }

    if (!street && !city && !province && !agentId) {
      res
        .status(400)
        .json({ message: "at least one valid property must be updated" });
      return;
    }

    const filter: editFilter = {};
    if (street) filter.street = street;
    if (city) filter.city = city;
    if (province) filter.province = province;

    // validate agent
    if (agentId) {
      if (typeof agentId !== "string" || !Types.ObjectId.isValid(agentId)) {
        res.status(400).json({ message: "invalid agent ID" });
        return;
      }

      const agent = Agent.findById(agentId);
      if (!agent) {
        res.status(404).json({ message: "agent not found" });
        return;
      }

      const idObj = new Types.ObjectId(agentId);
      filter.agentId = idObj;
    }

    const updated = await Property.findByIdAndUpdate({ _id: id }, filter, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "property not found" });
      return;
    }
    res.status(201).json(updated);
  } catch (err) {
    const msg = (err as Error).message || "unable to edit property";
    console.log(`propertyController editProperty error: ${msg}`);
    res.status(500).json({ message: "server error: unable to edit property" });
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const { id } = params;

    if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid property ID" });
      return;
    }

    const deletedPpty = await Property.findByIdAndDelete(id);

    if (!deletedPpty) {
      res.status(404).json({ message: "property not found" });
      return;
    }

    res.status(200).json(deletedPpty);
  } catch (err) {
    const msg = (err as Error).message || "unable to delete property";
    console.log(`propertyController deleteProperty error: ${msg}`);
    res
      .status(500)
      .json({ message: "server error: unable to delete property" });
  }
};
