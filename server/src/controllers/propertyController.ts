import { Request, Response } from "express";
import Property from "../models/Property";
import Agent from "../models/Agent";

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pptyArr = await Property.find();

    // Use Promise.all to fetch all agent emails concurrently
    const propertiesWithAgentEmails = await Promise.all(
      pptyArr.map(async (property) => {
        // Find agent by agentId
        const agent = await Agent.findOne({ agentId: property.agentId });

        // If agent is found, add email to property
        if (agent) {
          return { ...property.toObject(), agentEmail: agent.email };
        } else {
          return { ...property.toObject(), agentEmail: null };
        }
      })
    );

    res.status(201).json(propertiesWithAgentEmails);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server error", error: (e as Error).message });
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, street, province, postalCode } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) {
      res.status(401).json({ message: "Error: invalid email provided" });
      return;
    }

    // Create new property
    const newProperty = new Property({
      agentId: agent.agentId,
      address: {
        street,
        province,
        postalCode,
      },
    });

    await newProperty.save();
    // Validate here

    res.status(201).json(newProperty);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server error", error: (e as Error).message });
  }
};
