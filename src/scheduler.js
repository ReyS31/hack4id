const EventRepository = require('./Domains/events/EventRepository');
const PlaceRepository = require('./Domains/places/PlaceRepository');
const container = require('./Infrastructures/container');

module.exports = async () => {
  setInterval(
    async () => {
      const eventRepository = container.getInstance(EventRepository.name);
      const placeRepository = container.getInstance(PlaceRepository.name);

      await eventRepository.deactivatePin();
      await placeRepository.deactivatePin();
    },
    1000 * 60 * 60 * 24,
  );
};
