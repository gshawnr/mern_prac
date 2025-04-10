import { Schema, model } from "mongoose";

interface IProperty extends Document {
  agentId: string;
  address: {
    street: string;
    province: string;
    postalCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

const propertySchema = new Schema<IProperty>(
  {
    agentId: { type: String, required: true },
    address: {
      street: String,
      province: String, // update to use predefined list
      postalCode: String,
    },
  },
  { timestamps: true }
);

const Property = model("Property", propertySchema);

export default Property;
