import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
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

export const createAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const { firstName, lastName, email, telephone } = body;

    const agentDoc = await agentService.addAgent(
      firstName,
      lastName,
      email,
      telephone
    );

    res.status(201).json(agentDoc);
  } catch (err) {
    console.log(`createAgent error: ${(err as Error).message}`);
    res.status(500).json({ message: "server error: unable to create agent" });
  }
};

export const updateAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    const { agentId } = params;
    const { firstName, lastName, email, telephone } = body;

    const updatedAgent = await agentService.editAgent({
      agentId,
      firstName,
      lastName,
      email,
      telephone,
    });

    res.status(200).json(updatedAgent);
  } catch (err) {
    const msg = (err as Error).message || "error saving agent update";
    console.log(`agentsController updateAgent error: ${msg}`);
    res.status(500).json({ message: "server error: unable to update agent" });
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
