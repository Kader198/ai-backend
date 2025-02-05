const Joi = require('joi');

const createTask = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().valid('todo', 'in-progress', 'in-review', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  dueDate: Joi.date(),
  assigneeId: Joi.string().uuid(),
  projectId: Joi.string().uuid(),
  tags: Joi.array().items(Joi.string())
});

const updateTask = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('todo', 'in-progress', 'in-review', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  dueDate: Joi.date(),
  assigneeId: Joi.string().uuid(),
  projectId: Joi.string().uuid(),
  tags: Joi.array().items(Joi.string())
}).min(1);

module.exports = {
  createTask,
  updateTask
}; 