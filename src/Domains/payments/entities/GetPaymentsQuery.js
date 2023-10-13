class GetPaymentsQuery {
  constructor(payload) {
    this.page = payload.page;
    this.dyn_id = payload.dyn_id;
    this.media_type = payload.type;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }
}

module.exports = GetPaymentsQuery;
