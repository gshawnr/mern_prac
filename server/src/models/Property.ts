import { Types, Schema, model, Document } from "mongoose";

// Define the interface for Property
export interface IProperty extends Document {
  address: {
    street: string;
    city: string;
    province: string;
  };
  listingAgent: Types.ObjectId; // or you could use `IAgent` if you import the interface
}

const propertySchema = new Schema<IProperty>({
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
  },
  listingAgent: {
    type: Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

const Property = model<IProperty>("Property", propertySchema);

export default Property;
