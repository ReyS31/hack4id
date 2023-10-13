class EventMini {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.place_id = payload.place_id;
    this.thumbnail = payload.thumbnail;
    this.title = payload.title;
    this.views = payload.views;
    this.pinned = payload.pinned ?? false;
    this.created_at = payload.created_at;
  }

  #verifyPayload(payload) {
    const {
      id,
      place_id,
      thumbnail,
      title,
      created_at,
    } = payload;

    if (
      !id
      || !place_id
      || !thumbnail
      || !title
      || !created_at
    ) {
      throw new Error('EVENT_MINI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof place_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof title !== 'string'
      || typeof created_at !== 'string'
    ) {
      throw new Error('EVENT_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = EventMini;
