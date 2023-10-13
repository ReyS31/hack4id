class Event {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.user_id = payload.user_id;
    this.thumbnail = payload.thumbnail;
    this.title = payload.title;
    this.body = payload.body;
    this.pinned = payload.pinned ?? false;
    this.views = payload.views;
    this.created_at = payload.created_at;
  }

  #verifyPayload(payload) {
    const {
      id,
      user_id,
      thumbnail,
      title,
      body,
      created_at,
    } = payload;

    if (
      !id
      || !user_id
      || !thumbnail
      || !title
      || !body
      || !created_at
    ) {
      throw new Error('EVENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof user_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
      || typeof created_at !== 'object'
    ) {
      throw new Error('EVENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Event;
