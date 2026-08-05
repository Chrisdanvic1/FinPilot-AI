import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title cannot be empty"],
      trim: true,
      minLength: 5,
      maxLength: 150,
    },

    amount: {
      type: Number,
      required: [true, "Amount cannot be empty"],
      min: [0, "Amount cannot be less than 0"],
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },

    category: {
      type: String,
      required: [true, "Category cannot be empty"],
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Transfer", "Crypto", "Mobile Money", "Other"],
      default: "Cash",
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "NGN"],
      default: "NGN",
    },

    date: {
      type: Date,
      required: [true, "Date cannot be empty"],
      default: Date.now,
    },

    note: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
