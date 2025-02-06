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
      // Log tables for debugging
      const tables = await sequelize.getQueryInterface().showAllTables();
      console.log('Available tables:', tables);
      
      // Get total tasks with logging
      const totalTasks = await Task.count();
      console.log('Total tasks:', totalTasks);

      // Get tasks by status with detailed logging
      const tasksByStatus = await Task.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status'],
        raw: true // Add this to get plain objects
      });
      console.log('Tasks by status:', tasksByStatus);

      // Get team members count
      const teamMembers = await User.count();
      console.log('Team members:', teamMembers);

      // Get active projects
      const activeProjects = await Project.count({
        where: { status: 'active' }
      });
      console.log('Active projects:', activeProjects);

      // Calculate hours tracked (placeholder)
      const hoursTracked = 0; // Implement actual calculation if needed

      return {
        totalTasks,
        teamMembers,
        hoursTracked,
        activeProjects,
        tasksByStatus: tasksByStatus.map(t => ({
          status: t.status,
          count: parseInt(t.count)
        })),
        projectProgress: [], // Implement if needed
        recentActivity: [] // Implement if needed
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
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