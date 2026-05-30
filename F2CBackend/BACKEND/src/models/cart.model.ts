import { Schema, model, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number; // 🆕 Add price to store product price at time of adding to cart
  farmerid: Types.ObjectId; // ✅ Add this line

}

export interface ICart {
  userId: Types.ObjectId;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        farmerid: {
          type: Schema.Types.ObjectId,
          ref: "farmer",
          }
        
      }
    ]
  },
  { timestamps: true }
);

export const Cart = model<ICart>("cart", cartSchema);
