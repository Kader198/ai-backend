const Joi = require('joi');

const createTeam = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  members: Joi.array().items(Joi.string().uuid())
});

const updateTeam = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  members: Joi.array().items(Joi.string().uuid())
}).min(1);

module.exports = {
  createTeam,
  updateTeam
}; 