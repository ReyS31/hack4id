class PlaceQuery {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.name = payload.name;
    this.lat = Number(payload.lat);
    this.long = Number(payload.long);
    this.page = payload.page ? Number(payload.page) : 1;
    this.category = payload.category;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }

  #verifyPayload(payload) {
    const {
      name, page, lat, long, category,
    } = payload;

    if (!lat || !long) {
      throw new Error('PLACE_QUERY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof lat !== 'string' || typeof long !== 'string') {
      throw new Error('PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (name && typeof name !== 'string') {
      throw new Error('PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (page && typeof page !== 'string') {
      throw new Error('PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (category && typeof category !== 'string') {
      throw new Error('PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PlaceQuery;
