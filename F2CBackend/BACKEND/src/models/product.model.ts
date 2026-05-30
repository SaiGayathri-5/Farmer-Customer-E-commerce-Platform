import { Schema, model, Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  farmerId: Types.ObjectId; // Reference to Farmer
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: "farmer",
      required: true,
    }
  },
  { timestamps: true }
);

export const Product = model<IProduct>("product", productSchema);
