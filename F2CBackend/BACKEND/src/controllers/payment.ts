import asyncHandler from "../middlewares/AsyncHandler";
import { Request, Response } from "express";
import { Router } from "express";
import { dbDelete, validate } from "../middlewares/Validator";
import { IService, Service, IBooking, Booking } from "../models";
import { paymentValidator } from "../validators";
import { BadRequest, NotFound } from "../customErrors";
import { ObjectId } from "mongodb";
import { Status, PaymentStatus } from "../types";
import { IPayment, Payment } from "../models/payment.model";

const router = Router();

type MakePayment = IPayment & {};

type PaymentFilter = {
  bookingId: string;
  totalAmount: number;
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cvv: number;
  paymentStatus: string;
};

// Route to make a payment
router.post(
  "/",
  validate(paymentValidator),
  asyncHandler(async (req: Request, res: Response) => {
    const { bookingId, totalAmount, cardholderName, cardNumber, cardExpiry, cvv } =
      req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new NotFound("Booking not found");

    const payment: MakePayment = new Payment({
      bookingId,
      totalAmount,
      cardholderName,
      cardNumber,
      cardExpiry,
      cvv,
      paymentStatus: PaymentStatus.SUCCESS,
    });

    booking.status = Status.COMPLETED;
    booking.paymentStatus = PaymentStatus.SUCCESS;
    await booking.save();

    await payment.save();
    res.status(201).json({ message: "Payment initiated successfully"});
  })
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const payments = await Payment.find();
    res.status(200).json({ payments });
  })
);

// Route to get payment by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) throw new NotFound("Payment not found");
    res.status(200).json({ payment });
  })
);

// Route to update payment status
router.put(
  "/update-status/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { paymentStatus } = req.body;
    const payment = await Payment.findById(req.params.id);
    if (!payment) throw new NotFound("Payment not found");

    payment.paymentStatus = paymentStatus;
    await payment.save();
    res.status(200).json({ message: "Payment status updated", payment });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) throw new NotFound("Payment not found");
    await payment.deleteOne();
    res.status(200).json({ message: "Payment deleted successfully" });
  })
);

export default router;
