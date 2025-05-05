import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import PropertyService from "../services/PropertyService";
import AgentService from "../services/AgentService";

// NOTE: input validation (shape) should be completed in the contoller

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
    if (province) params.province = province;

    if (agentId) {
      if (!(typeof agentId == "string" && ObjectId.isValid(agentId))) {
        throw new Error("invalid agent id");
      }
      const _id = new ObjectId(agentId);
      params.agent = _id;
    }

    const properties = await propertyService.getAll(params);
    res.status(200).json(properties);
  } catch (err) {
    const msg = (err as Error).message || "error fetching properties";
    console.log(`propertyController allProperties error: ${msg}`);
    res
      .status(500)
      .json({ message: "server error: unable to fetch properties" });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;
    const { id } = params;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid property ID" });
      return;
    }

    const property = new PropertyService();

    const doc = await property.getById(new ObjectId(id));

    if (!doc) {
      res.status(404).json({ message: "property not found" });
      return;
    }

    res.status(200).json(doc);
  } catch (err) {
    const msg = (err as Error).message || "error getting property";
    console.log(`propertyController getPropertyById error: ${msg}`);
    res.status(500).json({ message: "sever error: unable to fetch property" });
  }
};

export const addProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("#*#*#*#*#* addProperty");
    const propertyService = new PropertyService();
    const agentService = new AgentService();

    const { body } = req;
    console.log("body", body);
    const { street, city, agentEmail, province } = body;

    const agents = await agentService.allAgents({ email: agentEmail });
    console.log("agents", agents);

    if (!(agents.length === 1)) {
      res.status(400).json({ message: "agent not found" });
      return;
    }

    const agentId = agents[0]._id;
    console.log("propetyController agentId", agentId);

    const propertyData = { street, city, province, agentId };

    const properties = await propertyService.save(propertyData);
    res.status(200).json(properties);
  } catch (err) {
    const msg = (err as Error).message || "error saving properties";
    console.log(`propertyController addProperty error: ${msg}`);
    res.status(500).json({ message: "sever error: unable to add property" });
  }
};

export const editProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const { street, city, province, agentId } = body;

    if (!street && !city && !province && !agentId) {
      res.status(400).json({
        message: "invalid input: at least one valid attribute must be provided",
      });
    }

    const property = new PropertyService();
    const edited = await property.save({
      id,
      street,
      city,
      province,
      agentId,
    });

    if (!edited) {
      res.status(404).json({ message: "property not found" });
      return;
    }

    res.status(201).json(edited);
  } catch (err) {
    const msg = (err as Error).message || "unable to edit property";
    console.log(`propertyController editProperty error: ${msg}`);
    res
      .status(500)
      .json({ message: "server error: unable to update property" });
  }
};

export const deletePropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;

    const propertyService = new PropertyService();
    const { deletedCount } = await propertyService.deleteById(params);

    res.status(200).json({ deletedCount });
  } catch (err) {
    const msg = (err as Error).message || "unable to delete property";
    console.log(`propertyController deleteById error: ${msg}`);
    res
      .status(500)
      .json({ message: "server error: unable to delete property" });
  }
};
