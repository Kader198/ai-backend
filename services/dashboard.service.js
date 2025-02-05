const { Task, User, Project, Team, sequelize } = require('../models');
const { Op } = require('sequelize');

class DashboardService {
  async getDashboardStats() {
    try {
      // Check if tables exist
      const tables = await sequelize.getQueryInterface().showAllTables();
      
      // Default response if tables don't exist
      const defaultStats = {
        totalTasks: 0,
        teamMembers: 0,
        hoursTracked: 0,
        activeProjects: 0,
        tasksByStatus: [],
        projectProgress: [],
        recentActivity: []
      };

      if (!tables.includes('Tasks') || !tables.includes('Users') || !tables.includes('Projects')) {
        return defaultStats;
      }

      // Get total tasks
      const totalTasks = await Task.count();

      // Get team members count
      const teamMembers = await User.count();

      // Get active projects
      const activeProjects = await Project.count({
        where: { status: 'active' }
      });

      // Get tasks by status
      const tasksByStatus = await Task.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      });

      // Get project progress
      const projectProgress = await Project.findAll({
        attributes: ['name', 'progress'],
        where: { status: 'active' },
        order: [['updatedAt', 'DESC']],
        limit: 5
      });

      // Get recent activity
      const recentActivity = await this.getRecentActivity();

      // Calculate hours tracked (example implementation)
      const hoursTracked = await this.calculateHoursTracked();

      return {
        totalTasks,
        teamMembers,
        hoursTracked,
        activeProjects,
        tasksByStatus: tasksByStatus.map(t => ({
          status: t.status,
          count: parseInt(t.getDataValue('count'))
        })),
        projectProgress: projectProgress.map(p => ({
          project: p.name,
          progress: p.progress
        })),
        recentActivity
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return defaultStats;
    }
  }

   async getRecentActivity() {
    const activities = [];

    // Get recent task updates
    const recentTasks = await Task.findAll({
      include: [{ model: User, as: 'assignee', attributes: ['name'] }],
      order: [['updatedAt', 'DESC']],
      limit: 5
    });

    activities.push(...recentTasks.map(task => ({
      id: task.id,
      type: 'task',
      user: task.assignee?.name || 'Unknown',
      action: `updated task "${task.title}"`,
      timestamp: task.updatedAt
    })));

    // Get recent project updates
    const recentProjects = await Project.findAll({
      order: [['updatedAt', 'DESC']],
      limit: 5
    });

    activities.push(...recentProjects.map(project => ({
      id: project.id,
      type: 'project',
      user: 'System',
      action: `updated project "${project.name}"`,
      timestamp: project.updatedAt
    })));

    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  }

   async calculateHoursTracked() {
    // This is a placeholder implementation
    // You might want to implement actual time tracking logic
    const completedTasks = await Task.count({
      where: { status: 'completed' }
    });
    return completedTasks * 2; // Assuming average 2 hours per task
  }
}

module.exports = new DashboardService(); 