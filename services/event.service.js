const { Event, User } = require('../models');

class EventService {
  async createEvent(eventData, createdBy) {
    const event = await Event.create({
      ...eventData,
      createdBy
    });

    if (eventData.attendees) {
      await event.setAttendees(eventData.attendees);
    }

    return event;
  }

  async getAllEvents(filters = {}) {
    return Event.findAll({
      where: filters,
      include: [
        { model: User, as: 'attendees', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });
  }

  async getEventById(id) {
    return Event.findByPk(id, {
      include: [
        { model: User, as: 'attendees', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });
  }

  async updateEvent(id, updateData) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }

    if (updateData.attendees) {
      await event.setAttendees(updateData.attendees);
      delete updateData.attendees;
    }

    return event.update(updateData);
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event.destroy();
  }
}

module.exports = new EventService(); 