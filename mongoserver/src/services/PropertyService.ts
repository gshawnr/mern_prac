import { Document, ObjectId } from "mongodb";
import { getDB } from "../db/mongoClient";
import Property from "../models/Property";

type getPropertyInput = {
  street?: string;
  city?: string;
  agentId?: ObjectId;
  province?: string;
};

type savePropertyInput = {
  _id?: ObjectId;
  street: string;
  city: string;
  agentId: ObjectId;
  province: string;
};

export default class PropertyService {
  private get db() {
    return getDB();
  }
  private collection() {
    return this.db.collection("properties");
  }

  async getProperties(params: getPropertyInput): Promise<Document[]> {
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

  // post or update
  async saveProperty(property: savePropertyInput): Promise<Document> {
    try {
      const { street, city, province, agentId, _id } = property;

      if (_id) {
        const res = await this.collection().findOneAndUpdate(
          { _id },
          { $set: { street, city, province, agentId } },
          { returnDocument: "after" }
        );

        if (!res) {
          throw new Error("unable to save property updates");
        }

        return res.value;
      } else {
        const propertyInst = new Property({
          street,
          city,
          province,
          agentId,
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
}
