import { Schema, model } from "mongoose";
import { IBaseUser, IbaseUserSchema } from "./base.model";

export interface IUser extends IBaseUser {
    mobileNumber: string;
    address: string;
}

const userSchema = new Schema(
    {
        ...IbaseUserSchema,
        mobileNumber: { type: String, required: true },
        address: { type: String, required: true },
    }
    , { timestamps: true });

export const User = model<IUser>("user", userSchema);
