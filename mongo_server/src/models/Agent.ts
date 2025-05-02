import { ObjectId, DeleteResult } from "mongodb";
type agentInput = {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

class Agent {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;

  constructor(agent: agentInput) {
    const { _id, firstName, lastName, email, telephone } = agent;
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telephone = telephone;
  }

  static fromDocument(doc: any): Agent {
    return new Agent(doc);
  }

  toDocument() {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      telephone: this.telephone,
    };
  }
}

export default Agent;
