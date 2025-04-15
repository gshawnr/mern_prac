import { Request, Response, NextFunction } from "express";
import Agent from "../models/Agent";

export const getAgents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const { email, lastName } = query;

    const filter: any = {};
    if (email) filter.email = email;
    if (lastName) filter.lastName = lastName;

    const agents = await Agent.find(filter);

    if (!agents) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(agents);
    return;
  } catch (e) {
    const message = (e as Error).message || "";
    console.log(message);
    res.status(500).json({ message: `server error: ${message}` });
  }
};

export const createAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req || {};

    const agentDetails = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      telephone: body.telephone,
    };

    const agent = new Agent(agentDetails);
    const dbRes = await agent.save();

    res.status(201).json(dbRes);
  } catch (e) {
    const msg = (e as Error).message;
    console.log(`createAgent error: ${msg}`);
  }
};
