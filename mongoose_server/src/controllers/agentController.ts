import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import Agent from "../models/Agent";

export const getAgents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const { firstName, lastName, email, telephone } = query;

    const filter: any = {};

    if (firstName || lastName || email || telephone) {
      if (firstName) filter.firstName = firstName;
      if (lastName) filter.lastName = lastName;
      if (email) filter.email = email;
      if (telephone) filter.telephone = telephone;
    }

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

export const getAgentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid agent ID" });
      return;
    }

    const agent = await Agent.findById(id);

    if (!agent) {
      res.status(404).json({ message: "agent not found" });
      return;
    }

    res.status(200).send(agent);
  } catch (err) {
    const msg = (err as Error).message || "error fetching agent";
    console.log(`agentController getAgentById error: ${msg}`);
    res.status(500).json({ message: "server error: unable to fetch agent" });
  }
};

export const createAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req || {};
    const { firstName, lastName, email, telephone } = body;

    if (!firstName || !lastName || !email || !telephone) {
      res.status(400).json({ message: "invalid agent input" });
      return;
    }

    const agent = new Agent({ firstName, lastName, email, telephone });
    const agentDoc = await agent.save();

    res.status(201).json(agentDoc);
  } catch (err) {
    const msg = (err as Error).message;
    console.log(`createAgent error: ${msg}`);
    res.status(500).json({ message: "sever error: unable to save agent" });
  }
};

export const updateAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body, params } = req || {};

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid agent ID" });
      return;
    }

    const { email, firstName, lastName, telephone } = body;

    const update: any = {};
    if (firstName) update.firstName = firstName;
    if (lastName) update.lastName = lastName;
    if (email) update.email = email;
    if (telephone) update.telephone = telephone;

    const agent = await Agent.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });

    if (!agent) {
      res.status(404).json({ message: "agent not found" });
      return;
    }

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
    const { params } = req;
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid agent ID" });
      return;
    }

    const deletedAgent = await Agent.findOneAndDelete({ _id: id });

    if (!deletedAgent) {
      res.status(404).json({ message: "agent not found" });
      return;
    }

    res.status(200).json(deletedAgent);
  } catch (err) {
    const msg = (err as Error).message || "unable to delete agent";
    console.log(`agentController deleteAgent error: ${msg}`);
    res.status(500).json({ message: "server error: unable to delete agent" });
  }
};
