const EventRepository = require('../EventRepository');

describe('EventRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const eventRepository = new EventRepository();

    // Action & Assert
    await expect(eventRepository.pagination({})).rejects.toThrowError(
      'EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(eventRepository.getById('')).rejects.toThrowError(
      'EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(eventRepository.addEvent({})).rejects.toThrowError(
      'EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(eventRepository.updateEvent('', {})).rejects.toThrowError(
      'EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(eventRepository.deleteEvent('')).rejects.toThrowError(
      'EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(eventRepository.verifyEventExists('')).rejects.toThrowError(
      'EVENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
