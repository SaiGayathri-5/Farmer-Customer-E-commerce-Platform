import { Schema } from "mongoose";

export type Role = "DELIVERY" | "FARMER" | "USER";

export type TokenInfo = {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  role: Role;
};

export enum RoleEnum {
  DELIVERY = "DELIVERY",
  FARMER = "FARMER",
  USER = "USER",
}

export enum Status{
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

export enum PaymentStatus{
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum SessionStatus {
  PENDING = "PENDING",
  PROGRESS = "PROGRESS",
  COMPLETED = "COMPLETED",
}
