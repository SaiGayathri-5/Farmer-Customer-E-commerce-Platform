import { Router, Request, Response } from "express";
import asyncHandler from "../middlewares/AsyncHandler";
import { Cart } from "../models/cart.model";
import { BadRequest } from "../customErrors";
import { Product } from "../models/product.model";

const router = Router();

// 🛒 GET /cart/:userId → Get cart by user ID
router.get(
  "/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json(cart || { userId, items: [] });
  })
);

// 🛒 POST /cart → Add or update item in cart
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      throw new BadRequest("Missing required fields");
    }

    if (quantity < 1) {
      throw new BadRequest("Quantity must be at least 1");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new BadRequest("Product not found");
    }

    const price = product.price;
    const farmerid = product.farmerId; // Ensure your Product schema has this field

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity, price, farmerid }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = price;
        cart.items[itemIndex].farmerid = farmerid;
      } else {
        cart.items.push({ productId, quantity, price, farmerid });
      }

      await cart.save();
    }

    res.status(201).json({ msg: "Cart updated", cart });
  })
);

// ✏️ PUT /cart/update → Update quantity of an item
router.put(
  "/update",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      throw new BadRequest("Missing required fields");
    }

    if (quantity < 1) {
      throw new BadRequest("Quantity must be at least 1");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new BadRequest("Product not found");
    }

    const price = product.price;

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new BadRequest("Cart not found");

    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item) throw new BadRequest("Item not found in cart");

    item.quantity = quantity;
    item.price = price; // update latest price

    await cart.save();

    res.json({ msg: "Cart item quantity updated", cart });
  })
);

// ❌ DELETE /cart/remove → Remove item from cart
router.delete(
  "/remove",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      throw new BadRequest("Missing required fields");
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new BadRequest("Cart not found");

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.json({ msg: "Item removed from cart", cart });
  })
);

export default router;
