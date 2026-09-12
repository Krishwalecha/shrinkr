import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import UrlRouter from "./routes/urls.route.js";
import userRouter from "./routes/user.router.js";

const app = express();

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/urls", UrlRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
