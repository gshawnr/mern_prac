import { Request, Response, NextFunction } from "express";
import AgentService from "../services/AgentService";

const agentService = new AgentService();

export const getAgents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { query } = req;
    const agentDocs = await agentService.allAgents(query);
    res.status(200).json(agentDocs);
  } catch (err) {
    console.log(`getAgents error: ${(err as Error).message}`);
    res.status(500).json({ message: "server error: unable to fetch agents" });
  }
};

export const getAgentWithId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const agentDocs = await agentService.getAgentById(params);
    res.status(200).json(agentDocs);
  } catch (err) {
    console.log(`getAgents error: ${(err as Error).message}`);
    res.status(500).json({ message: "server error: unable to fetch agents" });
  }
};

export const addAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const { firstName, lastName, email, telephone } = body;

    const agentDoc = await agentService.saveAgent(
      firstName,
      lastName,
      email,
      telephone
    );

    res.status(201).json(agentDoc);
  } catch (err) {
    console.log(`addAgent error: ${(err as Error).message}`);
    res.status(500).json({ message: "server error: unable to add agent" });
  }
};

export const deleteAgentWithId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const { deletedCount } = await agentService.deleteAgentById(params);

    if (deletedCount === 0) {
      res.status(404).json({ message: "agent not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.log(`deleteAgentWithId error: ${(err as Error).message}`);
    res.status(500).json({ message: "server error: unable to delete agent" });
  }
};
