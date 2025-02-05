const Joi = require('joi');

const createEvent = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required().min(Joi.ref('startDate')),
  type: Joi.string().valid('meeting', 'deadline', 'reminder').required(),
  location: Joi.string(),
  attendees: Joi.array().items(Joi.string().uuid())
});

const updateEvent = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date().min(Joi.ref('startDate')),
  type: Joi.string().valid('meeting', 'deadline', 'reminder'),
  location: Joi.string(),
  attendees: Joi.array().items(Joi.string().uuid())
}).min(1);

module.exports = {
  createEvent,
  updateEvent
}; 