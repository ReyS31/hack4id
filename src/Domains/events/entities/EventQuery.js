class EventQuery {
  constructor(payload) {
    this.user_id = payload.user_id;
    this.title = payload.title;
    this.page = payload.page;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }
}

module.exports = EventQuery;
