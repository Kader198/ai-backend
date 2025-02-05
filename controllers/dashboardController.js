const dashboardService = require('../services/dashboard.service');

const dashboardController = {
  async getStats(req, res, next) {
    try {
      const stats = await dashboardService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = dashboardController; 