import Router from "express";
import {
  createTransaction,
  getAllTransaction,
} from "../controllers/transactions.controller.js";
import authorize from "../middleware/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.get("/", authorize, getAllTransaction);
transactionRouter.get("/:id");
transactionRouter.post("/", authorize, createTransaction);
transactionRouter.patch("/:id");
transactionRouter.delete("/:id");

export default transactionRouter;
