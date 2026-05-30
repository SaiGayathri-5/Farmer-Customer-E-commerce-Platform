// deliveryboy.model.ts
import { Schema, model } from "mongoose";
import { IBaseUser, IbaseUserSchema } from "./base.model";

export interface IDeliveryProvider extends IBaseUser {
  mobileNumber: string;
  address: string;
}

const deliveryboySchema = new Schema(
  {
    ...IbaseUserSchema,
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const DeliveryBoy = model<IDeliveryProvider>("deliveryboy", deliveryboySchema);
