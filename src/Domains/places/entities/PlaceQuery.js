class PlaceQuery {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.name = payload.name;
    this.lat = payload.lat;
    this.long = payload.long;
    this.page = payload.page ?? 1;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }

  #verifyPayload(payload) {
    const {
      name, page, lat, long,
    } = payload;

    if (!page || !lat || !long) {
      throw new Error('PLACE_QUERY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof page !== 'string'
      || typeof lat !== 'string'
      || typeof long !== 'string'
    ) {
      throw new Error('PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (name && typeof name !== 'string') {
      throw new Error('PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PlaceQuery;
