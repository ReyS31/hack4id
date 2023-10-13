class AddEventViewsUseCase {
  constructor({ eventRepository, eventViewRepository }) {
    this._eventRepository = eventRepository;
    this._eventViewRepository = eventViewRepository;
  }

  async execute(useCasePayload) {
    const { eventId, clientId } = useCasePayload;
    await this._eventRepository.verifyEventExists(eventId);
    const isAlreadyExists = await
    this._eventViewRepository.isAlreadyExists(
      eventId,
      clientId,
    );

    if (!isAlreadyExists) {
      await this._eventViewRepository.addView(eventId, clientId);
      const latestViews = await this._eventRepository.getViews(eventId);
      await this._eventRepository.setViews(eventId, latestViews + 1);
    }
  }
}

module.exports = AddEventViewsUseCase;
