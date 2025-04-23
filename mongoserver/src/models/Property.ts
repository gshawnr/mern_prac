import { ObjectId } from "mongodb";
import Agent from "./Agent";

type propertyInput = {
  _id?: ObjectId;
  street: string;
  city: string;
  province: string;
  agentId: ObjectId;
};

class Property {
  _id?: ObjectId;
  street: string;
  city: string;
  province: string;
  agentId: ObjectId;

  constructor(property: propertyInput) {
    const { street, city, province, agentId, _id } = property;
    this.street = street;
    this.city = city;
    this.province = province;
    this._id = _id;
    this.agentId = agentId;
  }

  static fromDocument(doc: propertyInput): Property {
    return new Property(doc);
  }

  toDocument() {
    return {
      _id: this._id,
      street: this.street,
      city: this.city,
      province: this.province,
      agent: this.agentId,
    };
  }
}

export default Property;
