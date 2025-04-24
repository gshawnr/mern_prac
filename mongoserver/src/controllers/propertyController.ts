import { Request, Response, NextFunction } from "express";
import PropertyService from "../services/PropertyService";
import AgentService from "../services/AgentService";

export const allProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyService = new PropertyService();

    const { query } = req;
    const { street, city, agentId, province } = query;

    const params: any = {};
    if (street) params.street = street;
    if (city) params.city = city;
    if (agentId) params.agentId = agentId;
    if (province) params.province = province;

    const properties = await propertyService.getProperties(params);
    res.status(200).json(properties);
  } catch (err) {
    const msg = (err as Error).message || "error fetching properties";
    console.log(`propertyController allProperties error: ${msg}`);
    res
      .status(500)
      .json({ message: "server error: unable to fetch properties" });
  }
};

export const addProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyService = new PropertyService();
    const agentService = new AgentService();

    const { body } = req;
    const { street, city, agentEmail, province } = body;

    const agents = await agentService.allAgents({ email: agentEmail });

    if (!(agents.length === 1)) {
      res.status(400).json({ message: "agent not found" });
      return;
    }

    const agentId = agents[0]._id;
    const propertyData = { street, city, province, agentId };

    const properties = await propertyService.saveProperty(propertyData);
    res.status(200).json(properties);
  } catch (err) {
    const msg = (err as Error).message || "error saving properties";
    console.log(`propertyController addProperty error: ${msg}`);
    res.status(500).json({ message: "sever error: unable to add property" });
  }
};
