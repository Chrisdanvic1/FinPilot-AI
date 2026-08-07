import mongoose from "mongoose";
import { expenseCategories, incomeCategories } from "../constant/constant.js";
import Transaction from "../models/transactions.model.js";
import { validateTransaction } from "../validators/validator.js";

export const getAllTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find({ user: req.user._id });

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

export const getTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    if (!transactionId) {
      const err = new Error("transactionId not found");
      err.statusCode = 400;
      throw err;
    }

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      const error = new Error("Invalid task id");
      error.statusCode = 400;
      throw error;
    }

    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        status: false,
        message: `Transaction with id ${transactionId} not found`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Transaction with id ${transactionId} found`,
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

    if (!newTransaction) {
      return res.status(404).json({
        status: false,
        message: `Transaction not created an error occured`,
      });
    }

    res.status(201).json({
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

export const editTransaction = async (req, res) => {
  const transactionId = req.params.id;
  // const transactionId = req.user?.id || req.body.transactionId;

  if (!transactionId) {
    const err = new Error("transactionId for edit transaction not found");
    err.statusCode = 400;
    throw err;
  }

  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    const error = new Error("Invalid task id");
    error.statusCode = 400;
    throw error;
  }

  const { title, amount, type, category, paymentMethod, currency, date, note } =
    req.body;

  validateTransaction(title, amount, type, category);

  const transaction = await Transaction.findOneAndUpdate(
    { _id: transactionId, user: req.user._id },
    {
      title,
      amount,
      type,
      category,
      paymentMethod,
      currency,
      date,
      note,
    },
    { returnDocument: "after", runValidators: true },
  );

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message:
        "Transaction not found or you do not have permission to edit it.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    data: transaction,
  });
};

export const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;

  if (!transactionId) {
    const err = new Error("transactionId for edit transaction not found");
    err.statusCode = 400;
    throw err;
  }

  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    const error = new Error("Invalid task id");
    error.statusCode = 400;
    throw error;
  }

  const transaction = await Transaction.findByIdAndDelete({
    _id: transactionId,
    user: req.user._id,
  });

  if (!transaction) {
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  res.status(204).json({
    success: true,
    message: "Transaction deleted",
    data: transaction,
  });
};
