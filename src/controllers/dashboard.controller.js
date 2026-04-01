const DashboardModel = require('../models/dashboard.model');

async function getSummary(req, res, next) {
  try {
    const summary = await DashboardModel.getSummaryData();
    res.json({ summary });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary
};
