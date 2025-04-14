import { Schema, model } from "mongoose";

interface IProperty extends Document {
  agent: string;
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
    agent: { type: String, required: true },
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
