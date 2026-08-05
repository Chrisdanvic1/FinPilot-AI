import express, { urlencoded } from "express";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import cors from "cors";
import transactionRouter from "./routes/transactions.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(
  cors({
    origin: ["http://localhost:5173", "https://todo-api-full.vercel.app"],
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("FinPilot AI");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use(errorMiddleware);

export default app;
