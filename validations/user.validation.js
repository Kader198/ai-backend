const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user')
});

const updateUser = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('admin', 'user')
}).min(1);

module.exports = {
  createUser,
  updateUser
}; 