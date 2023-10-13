const EventQuery = require('../../Domains/events/entities/EventQuery');

class PaginateEventUseCase {
  constructor({ eventRepository }) {
    this._eventRepository = eventRepository;
  }

  async execute(useCasePayload) {
    console.log(useCasePayload);
    const eventQuery = new EventQuery(useCasePayload);
    console.log(eventQuery);
    await this._eventRepository.pagination(eventQuery);
  }
}

module.exports = PaginateEventUseCase;
