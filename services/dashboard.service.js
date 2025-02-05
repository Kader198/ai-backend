const { Task, User, Project, Team } = require('../models');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

class DashboardService {
  constructor() {
    // Define default stats object
    this.defaultStats = {
      totalTasks: 0,
      teamMembers: 0,
      hoursTracked: 0,
      activeProjects: 0,
      tasksByStatus: [],
      projectProgress: [],
      recentActivity: []
    };
  }

  async getDashboardStats() {
    try {
      // Check if tables exist
      const tables = await sequelize.getQueryInterface().showAllTables();
      
      if (!tables.includes('Tasks') || !tables.includes('Users') || !tables.includes('Projects')) {
        return this.defaultStats;
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

      // Calculate hours tracked
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
      return this.defaultStats;
    }
  }

  async getRecentActivity() {
    try {
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
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return [];
    }
  }

  async calculateHoursTracked() {
    try {
      const completedTasks = await Task.count({
        where: { status: 'completed' }
      });
      return completedTasks * 2; // Assuming average 2 hours per task
    } catch (error) {
      console.error('Error calculating hours tracked:', error);
      return 0;
    }
  }
}

module.exports = new DashboardService(); 