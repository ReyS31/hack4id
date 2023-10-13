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

  async getHomeHeadlines() {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteEvent(id) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyEventExists(id) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getViews(id) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async setViews(id, amount) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async activatePin(id, date) {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deactivatePin() {
    throw new Error('EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = EventRepository;
