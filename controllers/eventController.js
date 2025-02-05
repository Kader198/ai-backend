const eventService = require('../services/event.service');

const eventController = {
  async create(req, res, next) {
    try {
      const event = await eventService.createEvent(req.body, req.user.id);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const events = await eventService.getAllEvents(req.query);
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.json(event);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = eventController; 