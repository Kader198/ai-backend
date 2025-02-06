const dashboardService = require('../services/dashboard.service');

const dashboardController = {
  async getStats(req, res, next) {
    try {
      const stats = await dashboardService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res) => {
    try {
      // Clear the session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            message: 'Error during logout' 
          });
        }
        
        // Clear the cookie
        res.clearCookie('connect.sid');
        
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error during logout'
      });
    }
  }
};

module.exports = dashboardController; 