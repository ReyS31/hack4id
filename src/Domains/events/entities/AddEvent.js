class AddEvent {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.user_id = payload.user_id;
    this.thumbnail = payload.foto;
    this.preview = payload.preview;
    this.views = 0;
    this.title = payload.judul;
    this.body = payload.isi;
  }

  #verifyPayload(payload) {
    const {
      user_id, foto: thumbnail, preview, judul: title, isi: body,
    } = payload;
    if (!user_id || !thumbnail || !preview || !title || !body) {
      throw new Error('ADD_EVENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof user_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof title !== 'string'
      || typeof preview !== 'string'
      || typeof body !== 'string'
    ) {
      throw new Error('ADD_EVENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddEvent;
