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

type EditAgentInput = {
  id: ObjectId | string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  email?: string;
};

export default class AgentService {
  private get db() {
    return getDB();
  }

  private collection() {
    return this.db.collection("agents");
  }

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

  async addAgent(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string
  ): Promise<Document> {
    try {
      const agent = new Agent({ firstName, lastName, email, telephone });

      const doc = agent.toDocument();

      // TODO this is incorrect for an update.  doc._id will never exist here
      if (doc._id) {
        delete doc._id;
        const res = await this.collection().findOneAndUpdate(
          { _id: agent._id },
          { $set: doc },
          { returnDocument: "after" }
        );

        if (!res) {
          throw new Error("agent save error: unable to update agent");
        }

        return res.value;
      } else {
        const res = await this.collection().insertOne(doc);
        const { insertedId } = res;
        doc._id = insertedId;
        return doc;
      }
    } catch (err) {
      console.log(`addAgent err: ${(err as Error).message}`);
      throw new Error("server error: unable to create new agent");
    }
  }

  async editAgent(input: EditAgentInput): Promise<Document> {
    try {
      const { id, firstName, lastName, email, telephone } = input;

      if (typeof id !== "string" || !ObjectId.isValid(id)) {
        throw new Error("invalid agent ID provided");
      }

      let filter = { _id: new ObjectId(id) };

      let update: any = {};
      if (firstName || lastName || email || telephone) {
        if (firstName) update.firstName = firstName;
        if (lastName) update.lastName = lastName;
        if (email) update.email = email;
        if (telephone) update.telephone = telephone;
      }

      const doc = await this.collection().findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
      );

      if (!doc) {
        throw new Error("unable to update agent");
      }

      return doc;
    } catch (err) {
      console.log(`editAgent err: ${(err as Error).message}`);
      throw new Error("server error: unable to edit agent");
    }
  }

  async getAgentById(id: string | ObjectId): Promise<Document | null> {
    try {
      let validatedId;
      if (typeof id === "string" && ObjectId.isValid(id)) {
        validatedId = new ObjectId(id);
      } else if (id instanceof ObjectId) {
        validatedId = id;
      } else {
        throw new Error("Invalid agent ID");
      }

      const agentDoc = await this.collection().findOne({ _id: validatedId });

      return agentDoc;
    } catch (err) {
      const msg =
        (err as Error).message || "server error: unable to fetch agent by id";

      console.log(`getAgentById err: ${msg}, input: ${id}`);
      throw new Error(msg);
    }
  }

  async deleteAgentById(id: string | ObjectId): Promise<DeleteResult> {
    try {
      let validatedAgentId;
      if (typeof id === "string" && ObjectId.isValid(id)) {
        validatedAgentId = new ObjectId(id);
      } else if (id instanceof ObjectId) {
        validatedAgentId = id;
      } else {
        throw new Error("Invalid agent ID");
      }
      const objectId = new ObjectId(id);
      return await this.collection().deleteOne({ _id: objectId });
    } catch (err) {
      const msg =
        (err as Error).message || "server error: unable to delete agent by id";

      console.log(`deleteAgentById err: ${msg}, input: ${id}`);
      throw new Error(msg);
    }
  }
}
