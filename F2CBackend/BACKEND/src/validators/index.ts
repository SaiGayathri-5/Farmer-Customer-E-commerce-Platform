import { param, body, query } from "express-validator";
import { RoleEnum as ROLES } from "../types";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone); // Extend dayjs with timezone plugin
// set dayjs to IST timezone
dayjs.tz.setDefault("Asia/Kolkata");

export const idValidater = [
  param("id").isMongoId().withMessage("Id must be a valid mongo id"),
];

export const roleValidater = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),
];

export const roleParamsValidater = [
  query("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),
];

export const roleWithQParamsValidater = [
  query("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),

  query("q").optional().isString().withMessage("Query must be a string"),
];

export const addUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),
  body("mobileNumber")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number must be exactly 10 digits"),
  body("address")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),
];

export const editUserValidator = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email").optional().isEmail().withMessage("Email must be a valid email"),
  body("password")
    .optional()
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),
  body("mobileNumber")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number must be exactly 10 digits"),
  body("address")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),
];

export const forgotPasswordValidator = [
  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required")
    .isLength({ min: 6, max: 10 })
    .withMessage("New Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Role must be in " + Object.values(ROLES).join(", ")),
];

// Validate Service ID
export const serviceIdValidator = [
  param("id").isMongoId().withMessage("Service ID must be a valid MongoDB ID"),
];



// Validate Adding a Service
export const addServiceValidator = [
  body("providerId")
    .notEmpty()
    .withMessage("Provider Id is required")
    .isMongoId()
    .withMessage("Provider must be a valid MongoDB ID"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .trim()
    .withMessage("Name must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .trim()
    .withMessage("Description must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  body("availability")
    .optional()
    .isBoolean()
    .withMessage("Availability must be a boolean"),
];

// Validate Editing a Service
export const editServiceValidator = [
  body("provider")
    .optional()
    .isMongoId()
    .withMessage("Provider must be a valid MongoDB ID"),
  body("name")
    .optional()
    .isString()
    .trim()
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .trim()
    .withMessage("Description must be a string"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  body("availability")
    .optional()
    .isBoolean()
    .withMessage("Availability must be a boolean"),
];

// Validate Booking ID
export const bookingIdValidator = [
  param("id").isMongoId().withMessage("Booking ID must be a valid MongoDB ID"),
];

// Validate Creating a Booking
export const addBookingValidator = [
  body("userId")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("User id must be a valid MongoDB ID"),
  body("serviceId")
    .notEmpty()
    .withMessage("Service id is required")
    .isMongoId()
    .withMessage("Service id must be a valid MongoDB ID"),
  body("bookingDate")
    .optional()
    .isISO8601()
    .withMessage("Booking date must be a valid ISO8601 date format"),
  body("status")
    .optional()
    .isIn(["Pending", "Confirmed", "Cancelled", "Completed"])
    .withMessage(
      "Status must be one of: Pending, Confirmed, Cancelled, Completed"
    ),
  body("paymentStatus")
    .optional()
    .isIn(["Pending", "Paid", "Failed", "Refunded"])
    .withMessage(
      "Payment status must be one of: Pending, Paid, Failed, Refunded"
    ),
  body("totalAmount")
    .notEmpty()
    .withMessage("Total amount is required")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a non-negative number"),
];

// Validate Editing a Booking
export const editBookingValidator = [
  body("user")
    .optional()
    .isMongoId()
    .withMessage("User must be a valid MongoDB ID"),
  body("service")
    .optional()
    .isMongoId()
    .withMessage("Service must be a valid MongoDB ID"),
  body("provider")
    .optional()
    .isMongoId()
    .withMessage("Provider must be a valid MongoDB ID"),
  body("bookingDate")
    .optional()
    .isISO8601()
    .withMessage("Booking date must be a valid ISO8601 date format"),
  body("status")
    .optional()
    .isIn(["Pending", "Confirmed", "Cancelled", "Completed"])
    .withMessage(
      "Status must be one of: Pending, Confirmed, Cancelled, Completed"
    ),
  body("paymentStatus")
    .optional()
    .isIn(["Pending", "Paid", "Failed", "Refunded"])
    .withMessage(
      "Payment status must be one of: Pending, Paid, Failed, Refunded"
    ),
  body("totalAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a non-negative number"),
];

export const paymentValidator = [
  body("bookingId")
    .notEmpty()
    .withMessage("Booking ID is required")
    .isMongoId()
    .withMessage("Booking ID must be a valid MongoDB ID"),

  body("totalAmount")
    .notEmpty()
    .withMessage("Total amount is required")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a non-negative number"),

  body("cardholderName")
    .notEmpty()
    .withMessage("Cardholder name is required")
    .isString()
    .withMessage("Cardholder name must be a string"),

  body("cardNumber")
    .notEmpty()
    .withMessage("Card number is required")
    .isString()
    .withMessage("Card number must be a string")
    .matches(/^\d{16}$/)
    .withMessage("Card number must be exactly 16 digits"),

  body("cardExpiry")
    .notEmpty()
    .withMessage("Card expiry is required")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
    .withMessage("Card expiry must be in MM/YY format"),

  body("cvv")
    .notEmpty()
    .withMessage("CVV is required")
    .isInt({ min: 100, max: 999 })
    .withMessage("CVV must be a 3-digit number"),

  // body("paymentStatus")
  //   .optional()
  //   .isIn(["PENDING", "SUCCESS", "FAILED","REFUNDED"])
  //   .withMessage("Payment status must be one of:PENDING,SUCCESS, FAILED,REFUNDED"),
  
  // body("status")
  // .optional()
  // .isIn(["PENDING", "APPROVED", "COMPLETED","REJECTED"])
  // .withMessage("status must be one of: PENDING, APPROVED, COMPLETED,REJECTED"),
];

// Validate Feedback ID
export const feedbackIdValidator = [
  param("id").isMongoId().withMessage("Feedback ID must be a valid MongoDB ID"),
];

// Validate Adding Feedback
export const addFeedbackValidator = [
  body("userId")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("User id must be a valid MongoDB ID"),
  body("bookingId")
    .notEmpty()
    .withMessage("Booking id is required")
    .isMongoId()
    .withMessage("Booking must be a valid MongoDB ID"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .optional()
    .isString()
    .trim()
    .withMessage("Comment must be a string"),
];

// Validate Editing Feedback
export const editFeedbackValidator = [
  body("user")
    .optional()
    .isMongoId()
    .withMessage("User must be a valid MongoDB ID"),
  body("service")
    .optional()
    .isMongoId()
    .withMessage("Service must be a valid MongoDB ID"),
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .optional()
    .isString()
    .trim()
    .withMessage("Comment must be a string"),
];
