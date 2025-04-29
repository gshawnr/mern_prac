import { Types, Schema, model, Document } from "mongoose";

// Define the interface for Property
export interface IProperty extends Document {
  street: string;
  city: string;
  province: string;
  agent: Types.ObjectId; // or you could use `IAgent` if you import the interface
}

const propertySchema = new Schema<IProperty>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  agent: {
    type: Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

const Property = model<IProperty>("Property", propertySchema);

export default Property;
