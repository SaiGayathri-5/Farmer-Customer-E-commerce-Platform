import { Schema, model } from "mongoose";
import { IBaseUser, IbaseUserSchema } from "./base.model";

export interface IFarmer extends IBaseUser {
  mobileNumber: string;
  address: string;
}

const farmerSchema = new Schema<IFarmer>(
  {
    ...IbaseUserSchema,
    mobileNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // ensure 10 digit mobile number
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

export const Farmer = model<IFarmer>("farmer", farmerSchema);
