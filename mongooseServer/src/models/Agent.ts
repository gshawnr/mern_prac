import { Schema, Types, Document, model } from "mongoose";

export interface IAgent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

export const agentSchema = new Schema<IAgent>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
});

const Agent = model<IAgent>("Agent", agentSchema);

export default Agent;
