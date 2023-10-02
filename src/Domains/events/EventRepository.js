/* eslint-disable no-unused-vars */
class EventRepository {
  async pagination(eventQuery) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getById(id) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addEvent(addEvent) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateEvent(id, data) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteEvent(id) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyEventExists(id) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = EventRepository;
