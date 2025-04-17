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
    console.log("body in createAgent be", body);

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

export const updateAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req || {};
    const { email, firstName, lastName, telephone } = body;

    if (!email) {
      res.status(400).json("email is required and cannot be updated");
      return;
    }

    const update: any = {};
    if (firstName) update.firstName = firstName;
    if (lastName) update.lastName = lastName;
    if (telephone) update.telephone = telephone;

    const agent = await Agent.findOneAndUpdate({ email }, update, {
      new: true,
      runValidators: true,
    });

    res.status(201).json(agent);
  } catch (e) {
    const msg = (e as Error).message;
    console.log(`createAgent error: ${msg}`);
  }
};

export const deleteAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;

    if (!body.email) {
      res
        .status(400)
        .json({ message: "email of agent to be removed is required" });
      return;
    }

    const deletedAgent = await Agent.findOneAndDelete({ email: body.email });

    res.status(200).json(deletedAgent);
  } catch (err) {
    const msg = (err as Error).message || "";
    res.status(500).json({ message: msg });
  }
};
