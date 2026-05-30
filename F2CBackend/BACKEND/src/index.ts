import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import config from "./config";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { TokenInfo } from "./types";
import {
  FOLDER_PATH,
  blueText,
  greenText,
  redLogger,
  redText,
} from "./constants";
import { memberAuthHandler } from "./middlewares/AuthHandler";
import ErrorHandler from "./middlewares/ErrorHandler";
import { paginationChecker } from "./middlewares/PaginationChecker";

// 📁 Public Folder Setup
const publicFolderPath = path.join(process.cwd(), FOLDER_PATH.PUBLIC);
const uploadFolderPath = path.join(publicFolderPath, FOLDER_PATH.UPLOADS);

console.log(blueText, "🚀 Application Starting...", blueText);

[publicFolderPath, uploadFolderPath].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(blueText, `📁 Created: ${folder}`, blueText);
  } else {
    console.log(blueText, `📁 Exists: ${folder}`, blueText);
  }
});

// ✅ Safe CORS Configuration
const allowedOrigins = (
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : [
        "http://localhost",
        "http://localhost:80",
        "http://localhost:5173",
        "http://localhost:5173/",
      ]
).filter(Boolean) as string[];

const corsConfig: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

// 🚀 Express App Initialization
const app = express();
app.use(morgan("dev"));
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use("/static", express.static(publicFolderPath));

// 🌐 Extend Request with User Info
declare global {
  namespace Express {
    interface Request {
      user: TokenInfo;
      prevObject: any;
    }
  }
}

// ✅ Health Check Route
app.get("/", (_, res) => {
  res.json({
    status: "OK",
    health: "✅ Good",
    message: `Welcome to the API of ${config.APP_NAME}`,
  });
});

// ✅ Public Gemini AI Chat Endpoint (before auth)
const ai = new GoogleGenerativeAI("AIzaSyBXAz9wai3FQzMefBMC94Fpzhn9LnyESw0");

app.post("/api/chat", async (req: Request<{}, {}, { message: string }>, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message is required." });
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const reply = result.response.text();
    res.json({ reply });
  } catch (error: any) {
    console.error("❌ Gemini SDK error:", error.message || error);
    res.status(500).json({ reply: "Error generating response from AI service" });
  }
});

// 🌐 Protected Middleware (after public routes)
app.use(paginationChecker);
app.use(memberAuthHandler);

// 📦 Route Modules (ES Modules)
import userRoutes from "./controllers/user";
import productRoutes from "./controllers/product";
import cartRoutes from "./controllers/cartController";
import orderRoutes from "./controllers/orderRoutes";

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// 🚫 Catch-All Route
app.use("*", (_, res) => {
  res.status(404).json({
    status: "Not Found",
    health: "❌ Bad",
    msg: "Route Not Found",
  });
});

// 🧯 Global Error Handler
app.use(ErrorHandler);

// 🔄 Database and Server Setup
(async () => {
  try {
    console.log(blueText, "📦 Database Initialization Started", blueText);

    await mongoose.connect(config.DB_URL, {
      maxPoolSize: config.DB_POOL_SIZE,
    });

    console.log(greenText, "📦 Database Connected", greenText);
    console.log(greenText, `Connected to DB at ${config.DB_URL}`, greenText);

    app.listen(config.PORT, () => {
      console.log(
        greenText,
        `🎧 Server is listening on port: ${config.PORT} 🚀`,
        greenText
      );
    });
  } catch (error: any) {
    console.error(
      redText,
      "🚨 Error in server initialization \n",
      JSON.stringify(error, null, 2),
      redText
    );
    redLogger("🛑 Application Stopped due to DB/Server error");
    process.exit(1);
  }
})();

export default app;
