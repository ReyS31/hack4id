class GetPaymentsQuery {
  constructor(payload) {
    this.#verifyPayload(payload);
    this.user_id = payload.user_id;
    this.dyn_id = payload.dyn_id;
    this.media_type = payload.type;
    this.total = payload.total;
    this.unpin_at = payload.unpin_at;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }

  #verifyPayload(payload) {
    const {
      user_id, dyn_id, media_type, total, unpin_at,
    } = payload;

    if (!user_id || !dyn_id || !media_type || !total || !unpin_at) {
      throw new Error('ADD_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof user_id !== 'string'
    || typeof dyn_id !== 'string'
    || typeof media_type !== 'string'
    || typeof total !== 'number'
    || typeof unpin_at !== 'string') {
      throw new Error('ADD_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetPaymentsQuery;
