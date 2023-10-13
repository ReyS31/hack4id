class EventQuery {
  constructor(payload) {
    this.user_id = payload.user_id;
    this.name = payload.name;
    this.page = payload.page;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }
}

module.exports = EventQuery;
