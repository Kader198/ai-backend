const taskService = require('../services/task.service');

const taskController = {
  // Create task
  async create(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  // Get all tasks
  async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks(req.query);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  // Get task by ID
  async getById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  // Update task
  async update(req, res, next) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  // Delete task
  async delete(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = taskController; 