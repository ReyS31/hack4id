class EventQuery {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.place_id = payload.place_id;
    this.name = payload.name;
    this.page = payload.page;
  }

  #verifyPayload(payload) {
    const { place_id, name, page } = payload;

    if (!page || !place_id) {
      throw new Error('EVENT_QUERY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof page !== 'string'
      || typeof place_id !== 'string'
    ) {
      throw new Error('EVENT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (name && typeof name !== 'string') {
      throw new Error('EVENT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = EventQuery;
