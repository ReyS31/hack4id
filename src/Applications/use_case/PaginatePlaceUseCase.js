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
    const places = raw.places.map((datum) => {
      const clean = new PlaceMini(datum);
      const geoJson = datum.location;
      geoJson.properties = clean;
      geo.push(geoJson);

      return clean;
    });
    return { places, geo, total: raw.count };
  }
}

module.exports = PaginatePlaceUseCase;
