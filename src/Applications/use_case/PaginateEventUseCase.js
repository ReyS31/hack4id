const EventMini = require('../../Domains/events/entities/EventMini');
const EventQuery = require('../../Domains/events/entities/EventQuery');

class PaginateEventUseCase {
  constructor({ eventRepository }) {
    this._eventRepository = eventRepository;
  }

  async execute(useCasePayload) {
    const eventQuery = new EventQuery(useCasePayload);
    const events = await this._eventRepository.pagination(eventQuery);
    return { events: events.data.map((datum) => new EventMini(datum)), total: events.count };
  }
}

module.exports = PaginateEventUseCase;
