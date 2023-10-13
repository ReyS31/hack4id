const EventMini = require('../../Domains/events/entities/EventMini');

class GetHomeHeadlinesUseCase {
  constructor({ eventRepository }) {
    this._eventRepository = eventRepository;
  }

  async execute() {
    const data = await this._eventRepository.getHomeHeadlines();
    return data.map((datum) => new EventMini(datum));
  }
}

module.exports = GetHomeHeadlinesUseCase;
