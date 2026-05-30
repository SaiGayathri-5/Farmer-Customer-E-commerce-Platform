import { Router, Request, Response } from "express";
import asyncHandler from "../middlewares/AsyncHandler";
import { Order } from "../models/order.model";
import { Cart } from "../models/cart.model";
import { BadRequest } from "../customErrors";
import mongoose, { Types } from "mongoose";


const router = Router();

// 🔁 Simulate payment
const simulatePayment = async (
  method: "COD" | "UPI" | "CARD",
  cardDetails?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  }
): Promise<"Paid" | "Failed"> => {
  if (method === "COD") return "Paid";

  if (method === "CARD" && cardDetails) {
    const { cardNumber, expiryMonth, expiryYear, cvv } = cardDetails;

    const isValidCard =
      /^[0-9]{16}$/.test(cardNumber) &&
      /^[0-9]{2}$/.test(expiryMonth) &&
      /^[0-9]{4}$/.test(expiryYear) &&
      /^[0-9]{3}$/.test(cvv);

    return isValidCard ? "Paid" : "Failed";
  }

  if (method === "UPI") {
    // You can validate a UPI ID pattern if needed
    return "Paid"; // Always succeed for UPI
  }

  return "Failed";
};


// ✅ Place order from cart with dummy payment
router.post(
  "/user/place-order",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, paymentMethod, cardDetails } = req.body;

    if (!userId || !paymentMethod) {
      throw new BadRequest("Missing userId or payment method");
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      throw new BadRequest("Cart is empty");
    }

    let totalAmount = 0;
    const orderItems = cart.items.map((item) => {
      const price = item.price;
      totalAmount += price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price,
        farmerid: item.farmerid,
      };
    });

    const paymentStatus = await simulatePayment(paymentMethod, cardDetails);

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      status: paymentStatus === "Paid" ? "Pending" : "Failed",
      paymentStatus,
      paymentMethod,
      ...(paymentMethod === "CARD" && cardDetails && { cardDetails })
    });

    if (paymentStatus === "Paid") {
      await Cart.findOneAndDelete({ userId });
    }

    res.status(201).json({
      msg:
        paymentStatus === "Paid"
          ? "Order placed successfully"
          : "Payment failed. Please try again.",
      order
    });
  })
);

// 📦 Get all orders for a user
router.get(
  "/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 });

    res.json({ data: orders });
  })
);

router.get(
  "/:farmerId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { farmerId } = req.params;
      console.log("Received farmerId:", farmerId);

      if (!mongoose.Types.ObjectId.isValid(farmerId)) {
        return res.status(400).json({ success: false, message: "Invalid farmerId" });
      }

      const objectId = new mongoose.Types.ObjectId(farmerId);

      const orders = await Order.find({
        "items.farmerid": objectId,
      })
        .populate("items.productId", "name price image") // optionally populate farmer too
        .populate("items.farmerid", "mobileNumber address") // optional: populate farmer data
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  })
);





// 🚚 Assign delivery partner to an order
router.post(
  "/assign-delivery",
  asyncHandler(async (req: Request, res: Response) => {
    const { orderId, deliveryPartnerId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) throw new BadRequest("Order not found");

    order.deliveryPartnerId = deliveryPartnerId;
    order.status = "Assigned";

    await order.save();

    res.json({ msg: "Delivery partner assigned successfully", order });
  })
);



// Here get delivery boy orders based on his ID
router.get(
  "/deliveryboyorders/:deliveryboyid",
  asyncHandler(async (req: Request, res: Response) => {
    const deliveryboyid = req.params.deliveryboyid;
    try {
      const orders = await Order.find({
        deliveryPartnerId: deliveryboyid,
        status: { $ne: "Delivered" }, // fetch all except delivered
      })
        .populate("items.farmerid", "mobileNumber address") // Optional: populate farmer details
        .sort({ createdAt: -1 }); // Sort by newest first

      res.status(200).json({
        success: true,
        count: orders.length,
        orders,
      });
    } catch (error) {
      console.error("Error fetching delivery boy orders:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching orders",
      });
    }
  })
);




//delivery person change status
router.put(
  "/delivery-status",
  asyncHandler(async (req: Request, res: Response) => {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) throw new BadRequest("Order not found");
    order.status = status;
    await order.save();
    res.json({ msg: "Order status updated successfully", order });
  }
  )
);



// ✅ Get all orders (admin or dashboard)
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .populate("deliveryPartnerId", "name email")
      .sort({ createdAt: -1 });

    res.json({ data: orders });
  })
);


// Get completed (delivered) orders of a delivery boy
router.get(
  "/deliveryboycompletedorders/:deliveryboyid",
  asyncHandler(async (req: Request, res: Response) => {
    const deliveryboyid = req.params.deliveryboyid;

    try {
      const orders = await Order.find({
        deliveryPartnerId: deliveryboyid,
        status: "Delivered", // ✅ fetch only delivered orders
      })
        .populate("items.farmerid", "mobileNumber address") // ✅ populate farmer details
        .sort({ createdAt: -1 }); // ✅ newest first

      res.status(200).json({
        success: true,
        count: orders.length,
        orders,
      });
    } catch (error) {
      console.error("Error fetching completed orders:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching completed orders",
      });
    }
  })
);


// 👨‍🌾 Get all paid orders related to a specific farmer
router.get(
  "/farmer/:farmerId/payments",
  asyncHandler(async (req: Request, res: Response) => {
    const { farmerId } = req.params;

    const payments = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $match: {
          "productInfo.farmerId": new Types.ObjectId(farmerId),
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          deliveryPartnerId: { $first: "$deliveryPartnerId" },
          totalAmount: { $first: "$totalAmount" },
          paymentMethod: { $first: "$paymentMethod" },
          paymentStatus: { $first: "$paymentStatus" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          items: { $push: "$items" },
          products: { $push: "$productInfo" }
        },
      },
      { $sort: { createdAt: -1 } }
    ]);

    res.json({ data: payments });
  })
);


export default router;
