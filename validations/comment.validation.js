const Joi = require('joi');

const createComment = Joi.object({
  content: Joi.string().required(),
  taskId: Joi.string().uuid().required()
});

const updateComment = Joi.object({
  content: Joi.string().required()
});

module.exports = {
  createComment,
  updateComment
}; 