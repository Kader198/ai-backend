const { Task, User, Project, Comment, Attachment } = require('../models');

class TaskService {
  async createTask(taskData) {
    return Task.create(taskData);
  }

  async getAllTasks(filters = {}) {
    return Task.findAll({
      where: filters,
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
      order: [['createdAt', 'DESC']]
    });
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