const { getDb } = require('../db');

async function getSummaryData() {
  const db = await getDb();
  
  // Total Income
  const incomeResult = await db.get('SELECT SUM(amount) as total FROM records WHERE type = "income" AND isDeleted = 0');
  const totalIncome = incomeResult.total || 0;

  // Total Expenses
  const expenseResult = await db.get('SELECT SUM(amount) as total FROM records WHERE type = "expense" AND isDeleted = 0');
  const totalExpenses = expenseResult.total || 0;

  const netBalance = totalIncome - totalExpenses;

  // Category-wise totals
  const categoryTotals = await db.all('SELECT category, type, SUM(amount) as total FROM records WHERE isDeleted = 0 GROUP BY category, type');

  // Recent activity (last 5 records)
  const recentActivity = await db.all('SELECT * FROM records WHERE isDeleted = 0 ORDER BY date DESC, id DESC LIMIT 5');

  return {
    totalIncome,
    totalExpenses,
    netBalance,
    categoryTotals,
    recentActivity
  };
}

module.exports = {
  getSummaryData
};
