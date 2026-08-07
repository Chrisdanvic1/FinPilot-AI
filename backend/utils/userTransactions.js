export const calculateIncome = (transaction) => {
  if (!transaction) {
    const err = new Error("Calculate Transaction not found");
    err.statusCode = 404;
    throw err;
  }

  const incomeTransaction = transaction.filter(
    (transaction) => transaction.type === "income",
  );

  console.log("IncomeTransaction", incomeTransaction);

  const reducedIncomeTransaction = incomeTransaction.reduce(
    (a, b) => a + b.amount,
    0,
  );

  console.log("reudced", reducedIncomeTransaction);

  return reducedIncomeTransaction;
};

export const calculateExpenses = (transaction) => {
  if (!transaction) {
    const err = new Error("Calculate Transaction not found");
    err.statusCode = 404;
    throw err;
  }

  const expenseTransaction = transaction.filter(
    (item) => item.type === "expense",
  );

  console.log("Expense Transaction", expenseTransaction);

  const reducedExpenseTransaction = expenseTransaction.reduce(
    (a, b) => a + b.amount,
    0,
  );

  console.log("reudced", reducedExpenseTransaction);

  return reducedExpenseTransaction;
};

export const calculateBalance = (income, expense) => {
  const totalIncome = income;
  const totalExpense = expense;

  const balance = totalIncome - totalExpense;

  return balance;
};

export const getRecentTransactions = (transaction) => {
  if (!transaction) {
    const err = new Error("Recent ransaction not found");
    err.statusCode = 404;
    throw err;
  }

  return [...transaction].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};
