const PlaceMini = require('../../Domains/places/entities/PlaceMini');
const PlaceQuery = require('../../Domains/places/entities/PlaceQuery');

class PaginatePlaceUseCase {
  constructor({ placeRepository }) {
    this._placeRepository = placeRepository;
  }

  async execute(useCasePayload) {
    const placeQuery = new PlaceQuery(useCasePayload);
    const raw = await this._placeRepository.pagination(placeQuery);
    const geo = [];
    const places = [];
    raw.forEach((datum) => {
      const clean = new PlaceMini(datum);
      places.push(clean);
      const geoJson = datum.location;
      geoJson.properties = clean;
      geo.push(geoJson);
    });

    return { places, geo };
  }
}

module.exports = PaginatePlaceUseCase;
