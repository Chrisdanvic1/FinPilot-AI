import Router from "express";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
  getAllTransaction,
  getTransaction,
} from "../controllers/transactions.controller.js";
import authorize from "../middleware/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.get("/", authorize, getAllTransaction);
transactionRouter.get("/:id", authorize, getTransaction);
transactionRouter.post("/", authorize, createTransaction);
transactionRouter.patch("/:id", authorize, editTransaction);
transactionRouter.delete("/:id", authorize, deleteTransaction);

export default transactionRouter;
