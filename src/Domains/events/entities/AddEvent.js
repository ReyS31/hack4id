class AddEvent {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.place_id = payload.place_id;
    this.thumbnail = payload.thumbnail;
    this.title = payload.title;
    this.body = payload.body;
  }

  #verifyPayload(payload) {
    const {
      place_id, thumbnail, title, body,
    } = payload;

    if (!place_id || !thumbnail || !title || !body) {
      throw new Error('ADD_EVENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof place_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
    ) {
      throw new Error('ADD_EVENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddEvent;
