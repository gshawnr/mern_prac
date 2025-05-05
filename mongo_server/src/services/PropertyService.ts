import { Document, ObjectId } from "mongodb";
import { getDB } from "../db/mongoClient";
import Property from "../models/Property";
import { ParamsDictionary } from "express-serve-static-core";
import { DeleteResult } from "mongoose";
import AgentService from "./AgentService";

type getPropertyInput = {
  street?: string;
  city?: string;
  agentId?: ObjectId;
  province?: string;
};

type savePropertyInput = {
  id?: ObjectId | string | null;
  street: string;
  city: string;
  agentId: ObjectId;
  province: string;
};

type propertyEdit = {
  street?: string;
  city?: string;
  agentId?: ObjectId;
  province?: string;
};

export default class PropertyService {
  private get db() {
    return getDB();
  }
  private collection() {
    return this.db.collection("properties");
  }

  async getAll(params: getPropertyInput): Promise<Document[]> {
    try {
      let filter: getPropertyInput = { ...params };
      const properties = this.collection().find(filter).toArray();
      return properties;
    } catch (err) {
      const msg = (err as Error).message || "get properties error";
      console.log(`PropertyService getProperties error: ${msg}`);
      throw new Error(msg);
    }
  }

  // getById
  async getById(id: ObjectId): Promise<Document | null> {
    try {
      return await this.collection().findOne({ _id: id });
    } catch (err) {
      const msg = (err as Error).message || "unable to get property by ID";
      console.log(`PropertyService getById error: ${msg}`);
      throw new Error(msg);
    }
  }

  // post or update
  async save(property: savePropertyInput): Promise<Document> {
    try {
      const { id, street, city, province, agentId } = property;

      let validatedAgentId: ObjectId | null = null;
      if (agentId) {
        if (typeof agentId === "string" && ObjectId.isValid(agentId)) {
          validatedAgentId = new ObjectId(agentId as string);
        } else if (agentId instanceof ObjectId) {
          validatedAgentId = agentId;
        } else {
          throw new Error("invalid agentId provided");
        }

        const agent = new AgentService();
        const foundAgent = await agent.getAgentById(validatedAgentId);

        if (!foundAgent) {
          throw new Error("invalid agent ID");
        }

        validatedAgentId = foundAgent._id;
      }

      if (id) {
        if (typeof id !== "string" || !ObjectId.isValid(id)) {
          throw new Error("invalid property ID");
        }

        const update: propertyEdit = {};
        if (street) update.street = street;
        if (city) update.city = city;
        if (province) update.province = province;
        if (validatedAgentId) update.agentId = validatedAgentId;

        const res = await this.collection().findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: update },
          { returnDocument: "after" }
        );

        if (!res) {
          throw new Error("unable to save property updates");
        }

        return res;
      } else {
        if (!street || !city || !province || !validatedAgentId) {
          throw new Error("valid input required");
        }
        const propertyInst = new Property({
          street,
          city,
          province,
          agentId: validatedAgentId,
        });

        const doc = propertyInst.toDocument();
        const res = await this.collection().insertOne(doc);

        if (!res) {
          throw new Error("property save error: unable to save new property");
        }

        const { insertedId } = res;
        doc["_id"] = insertedId;
        return doc;
      }
    } catch (err) {
      const msg = (err as Error).message || "create property error";
      console.log(`PropertyService createProperty error: ${msg}`);
      throw new Error(msg);
    }
  }

  async deleteById(params: ParamsDictionary): Promise<DeleteResult> {
    try {
      const { id } = params;

      if (!(typeof id === "string" && ObjectId.isValid(id))) {
        throw new Error("invalid id provided");
      }

      const _id = new ObjectId(id);
      const res = await this.collection().deleteOne({ _id });

      return res;
    } catch (err) {
      const msg = (err as Error).message || "unable to delete property";
      console.log(`PropertyService deleteById error: ${msg}`);
      throw new Error(msg);
    }
  }
}
