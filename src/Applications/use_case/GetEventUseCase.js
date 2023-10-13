class GetEventUseCase {
  constructor({ eventRepository }) {
    this._eventRepository = eventRepository;
  }

  async execute(useCasePayload) {
    await this._eventRepository.verifyEventExists(useCasePayload);
    return this._eventRepository.getById(useCasePayload);
  }
}

module.exports = GetEventUseCase;
