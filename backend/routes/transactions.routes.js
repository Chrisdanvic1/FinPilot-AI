import Router from "express";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
  getAllUserTransactions,
  getUserTransaction,
} from "../controllers/transactions.controller.js";
import authorize from "../middleware/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.get("/", authorize, getAllUserTransactions);
transactionRouter.get("/:id", authorize, getUserTransaction);
transactionRouter.post("/", authorize, createTransaction);
transactionRouter.patch("/:id", authorize, editTransaction);
transactionRouter.delete("/:id", authorize, deleteTransaction);

export default transactionRouter;
