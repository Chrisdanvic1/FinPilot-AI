import { expenseCategories, incomeCategories } from "../constant/constant.js";

export const validateTransaction = (title, amount, type, category) => {
  if (!title) {
    throw new Error("Title cannot be empty");
  }

  if (title.length < 5) {
    throw new Error("Title must be at least 5 characters");
  }

  if (amount === undefined || amount === null) {
    throw new Error("Amount cannot be empty");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  if (!type) {
    throw new Error("Type cannot be empty");
  }

  if (!["income", "expense"].includes(type)) {
    throw new Error("Type must be income or expense");
  }

  if (!category) {
    throw new Error("Category cannot be empty");
  }

  const cleanCategory =
    category.trim().charAt(0).toUpperCase() +
    category.trim().slice(1).toLowerCase();

  if (type === "income" && !incomeCategories.includes(cleanCategory)) {
    throw new Error("Invalid income category");
  }

  if (type === "expense" && !expenseCategories.includes(cleanCategory)) {
    throw new Error("Invalid expense category");
  }
};
