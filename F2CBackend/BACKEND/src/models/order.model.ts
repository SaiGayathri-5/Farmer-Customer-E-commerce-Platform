import { Schema, model, Types } from "mongoose";

export interface IOrder {
  userId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    farmerid : Types.ObjectId;
  }[];
  totalAmount: number;
  deliveryPartnerId?: Types.ObjectId;
  status: "Pending" | "Assigned" | "Delivered" | "Failed";
  paymentStatus: "Pending" | "Paid" | "Failed";
  paymentMethod: "COD" | "UPI" | "CARD";
  cardDetails?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  };
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        farmerid : { type: Schema.Types.ObjectId, ref: "farmer", 
          }
        //farmerid also i want
        

      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Assigned","Picked-Up", "Delivered","In-transit", "Failed"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      required: true,
    },
    cardDetails: {
      cardNumber: { type: String },
      expiryMonth: { type: String },
      expiryYear: { type: String },
      cvv: { type: String },
    },
    deliveryPartnerId: {
      type: Schema.Types.ObjectId,
      ref: "deliveryboy",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("order", orderSchema);
