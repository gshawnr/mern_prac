import { Request, Response } from "express";
import Property from "../models/Property";
import Agent from "../models/Agent";
import mongoose from "mongoose";

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      query: { province, agentEmail },
    } = req;

    const filter: any = {};
    if (province) {
      filter["address.province"] = province;
    }

    if (agentEmail) {
      filter.agent = agentEmail;
    }

    const properties = await Property.find(filter);

    res.status(201).json(properties);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server error", error: (e as Error).message });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "invalid property id" });
      return;
    }

    const property = await Property.findById(id);

    if (!property) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(property);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { agentEmail, street, province, postalCode } = req.body;

    const agent = await Agent.findOne({ email: agentEmail });
    if (!agent) {
      res.status(401).json({ message: "Error: invalid email provided" });
      return;
    }

    // Create new property
    const newProperty = new Property({
      agent: agentEmail,
      address: {
        street,
        province,
        postalCode,
      },
    });

    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server error", error: (e as Error).message });
  }
};

export const updatePropertyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const { street, province, postalCode } = body;

    const update: any = {};
    if (street || province || postalCode) {
      // update.address = {};
      if (street) update["address.street"] = street;
      if (province) update["address.province"] = province;
      if (postalCode) update["address.postalCode"] = postalCode;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid property id" });
      return;
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedProperty) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(201).json(updatedProperty);
    return;
  } catch (e) {
    res.status(500).json({ message: `server error: ${(e as Error).message}` });
  }
};

export const updateProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query = {}, body = {} } = req;

    const agentId = String(query.agentId);
    const { street, province, postalCode } = body;

    if (!agentId) {
      res.status(400).json({ message: "invalid agent id" });
      return;
    }

    const filter = {
      agentId,
    };

    const update: any = {};
    if (street || province || postalCode) {
      if (street) update["address.street"] = street;
      if (province) update["address.province"] = province;
      if (postalCode) update["address.postalCode"] = postalCode;
    }

    const updated = await Property.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(201).json(update);
    return;
  } catch (e) {
    res.status(500).json({ message: `server error: ${(e as Error).message}` });
    return;
  }
};

export const deletePropertyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid property id" });
      return;
    }

    const deletedProperty = await Property.findByIdAndDelete(id);
    console.log("deleted Property", deletedProperty);

    if (!deletedProperty) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: `server error: ${(e as Error).message}` });
  }
};
