import { Schema, model } from "mongoose";

interface IAgent extends Document {
  agentId: string;
  email: string;
}

const agentSchema = new Schema<IAgent>(
  {
    agentId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Agent = model("Agent", agentSchema);

export default Agent;
