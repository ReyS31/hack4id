class EventMini {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.user_id = payload.user_id;
    this.thumbnail = payload.thumbnail;
    this.preview = payload.preview;
    this.title = payload.title;
    this.views = payload.views;
    this.pinned = payload.pinned ?? false;
    this.created_at = payload.created_at;
  }

  #verifyPayload(payload) {
    const {
      id,
      user_id,
      thumbnail,
      title,
      created_at,
    } = payload;

    if (
      !id
      || !user_id
      || !thumbnail
      || !title
      || !created_at
    ) {
      throw new Error('EVENT_MINI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof user_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof title !== 'string'
      || typeof created_at !== 'object'
    ) {
      throw new Error('EVENT_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = EventMini;
