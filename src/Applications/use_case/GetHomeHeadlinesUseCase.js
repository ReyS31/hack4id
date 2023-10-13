const EventMini = require('../../Domains/events/entities/EventMini');

class GetHomeHeadlinesUseCase {
  constructor({ eventRepository }) {
    this._eventRepository = eventRepository;
  }

  async execute(useCasePayload) {
    const data = await this._eventRepository.getById(useCasePayload);
    return data.map((datum) => new EventMini(datum));
  }
}

module.exports = GetHomeHeadlinesUseCase;
