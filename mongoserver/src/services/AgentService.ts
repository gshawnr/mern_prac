import { ParamsDictionary } from "express-serve-static-core";
import { ObjectId, Document, DeleteResult } from "mongodb";

import Agent from "../models/Agent";
import { getDB } from "../db/mongoClient";
import { ParsedQs } from "qs";

type AgentQPFilter = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export default class AgentService {
  private get db() {
    return getDB();
  }

  private collection() {
    return this.db.collection("agents");
  }
  constructor() {}

  async allAgents(queryParams: ParsedQs): Promise<Document[]> {
    try {
      const filter: AgentQPFilter = {
        ...(queryParams.firstName && {
          firstName: queryParams.firstName as string,
        }),
        ...(queryParams.lastName && {
          lastName: queryParams.lastName as string,
        }),
        ...(queryParams.email && { email: queryParams.email as string }),
      };

      return await this.collection().find(filter).toArray();
    } catch (err) {
      const msg = (err as Error).message || "unable to fetch agents";
      console.log(`agentServer allAgents error: ${msg}`);
      throw new Error(msg);
    }
  }

  async createAgent(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string
  ): Promise<Document> {
    try {
      const agent = new Agent({ firstName, lastName, email, telephone });

      const doc = agent.toDocument();

      if (doc._id) {
        delete doc._id;
        const res = await this.collection().findOneAndUpdate(
          { _id: agent._id },
          { $set: doc },
          { returnDocument: "after" }
        );

        if (!res) {
          throw new Error("agent save error: unable to save updates");
        }

        return res.value;
      } else {
        const res = await this.collection().insertOne(doc);
        const { insertedId } = res;
        doc._id = insertedId;
        return doc;
      }
    } catch (err) {
      console.log(`createAgent err: ${(err as Error).message}`);
      throw new Error("server error: unable to create new agent");
    }
  }

  async getAgentById(urlParams: ParamsDictionary): Promise<Document | null> {
    try {
      const { agentId } = urlParams;

      if (typeof agentId !== "string" || !ObjectId.isValid(agentId)) {
        throw new Error("Invalid agent ID");
      }

      const objectId = new ObjectId(agentId);

      const agentDoc = await this.collection().findOne({ _id: objectId });

      return agentDoc;
    } catch (err) {
      const msg =
        (err as Error).message || "server error: unable to fetch agent by id";

      console.log(`getAgentById err: ${msg}, urlParams: ${urlParams}`);
      throw new Error(msg);
    }
  }

  async deleteAgentById(urlParams: ParamsDictionary): Promise<DeleteResult> {
    try {
      const { agentId } = urlParams;

      if (typeof agentId !== "string" || !ObjectId.isValid(agentId)) {
        throw new Error("Invalid agent ID");
      }
      const objectId = new ObjectId(agentId);
      return await this.collection().deleteOne({ _id: objectId });
    } catch (err) {
      const msg =
        (err as Error).message || "server error: unable to delete agent by id";

      console.log(`deleteAgentById err: ${msg}, urlParams: ${urlParams}`);
      throw new Error(msg);
    }
  }
}
