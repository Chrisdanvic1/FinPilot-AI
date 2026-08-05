import mongoose from "mongoose";
import { expenseCategories, incomeCategories } from "../constant/constant.js";
import Transaction from "../models/transactions.model.js";
import { validateTransaction } from "../validators/validator.js";

export const getAllTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find();

    res.status(200).json({
      success: true,
      message: "All transaction",
      data: transaction,
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 400;
    throw err;
  }
};

export const createTransaction = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      category,
      paymentMethod,
      currency,
      date,
      note,
    } = req.body;
    validateTransaction(title, amount, type, category);
    const newTransaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      type,
      category,
      paymentMethod,
      currency,
      date,
      note,
    });

    res.status(200).json({
      success: true,
      message: "Transaction created",
      data: {
        transaction: newTransaction,
      },
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 400;
    throw err;
  }
};
