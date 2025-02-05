const Joi = require('joi');

const createProject = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().valid('active', 'completed', 'on-hold'),
  startDate: Joi.date(),
  endDate: Joi.date(),
  teamId: Joi.string().uuid()
});

const updateProject = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('active', 'completed', 'on-hold'),
  startDate: Joi.date(),
  endDate: Joi.date(),
  teamId: Joi.string().uuid(),
  progress: Joi.number().min(0).max(100)
}).min(1);

module.exports = {
  createProject,
  updateProject
}; 