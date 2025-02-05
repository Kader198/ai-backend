const User = require('./user');
const Task = require('./task');
const Project = require('./project');
const Comment = require('./comment');
const Attachment = require('./attachment');
const Team = require('./team');
const Event = require('./event');

// Initialize associations
const models = {
  User,
  Task,
  Project,
  Comment,
  Attachment,
  Team,
  Event
};

// Call associate method for each model
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = models; 