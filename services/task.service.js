const { Task, User, Project, Comment, Attachment } = require('../models');
const { Op } = require('sequelize');

class TaskService {
  async createTask(taskData) {
    return Task.create(taskData);
  }

  async getAllTasks({ page = 1, pageSize = 10, search, filters = {} }) {
    try {
      let whereClause = { ...filters };

      // Add search functionality
      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } }
          ]
        };
      }

      // Get total count for pagination
      const total = await Task.count({ where: whereClause });

      // Get paginated tasks
      const tasks = await Task.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'assignee',
            attributes: ['id', 'name', 'email']
          },
          {
            model: Project,
            as: 'project',
            attributes: ['id', 'name']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'name', 'email']
              }
            ]
          },
          {
            model: Attachment,
            as: 'attachments'
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: pageSize,
        offset: (page - 1) * pageSize
      });

      return {
        tasks,
        total
      };
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id) {
    return Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name', 'email']
            }
          ]
        },
        {
          model: Attachment,
          as: 'attachments'
        }
      ]
    });
  }

  async updateTask(id, updateData) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task.update(updateData);
  }

  async deleteTask(id) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task.destroy();
  }
}

module.exports = new TaskService(); 