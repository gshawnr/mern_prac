import { Request, Response } from "express";
import Agent from "../models/Agent";
import { generateRandomId } from "../utils/generateId";
import mongoose from "mongoose";

export const getAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query = {} } = req;

    const dbRes = await Agent.find();

    // handle not found

    res.status(200).json(dbRes);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server Error", error: (e as Error).message });
  }
};

export const getAgentByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { email },
    } = req;

    console.log("Checking", email);

    const agent = await Agent.findOne({ email });

    if (!agent) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(agent);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: (e as Error).message });
  }
};

export const createAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { params, body } = req;
    const { email = "" } = body;

    const id = generateRandomId(8);

    const agent = new Agent({ agentId: id, email });
    const dbRes = await agent.save();

    const { agentId, email: dbEmail } = agent;
    res.status(201).json({ agent: agentId, email: dbEmail });
  } catch (e) {
    let status = 500;
    let msg = "Server Error";

    const { errorResponse: { code } = {} } = e as any;
    if (code == 11000) {
      status = 401;
      msg = "Email is already in use";
    }

    res.status(status).json({ message: msg });
  }
};
