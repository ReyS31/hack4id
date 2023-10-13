/* eslint-disable consistent-return */
const express = require('express');
const PaginateEventUseCase = require('../../../Applications/use_case/PaginateEventUseCase');

class EventsHandler {
  constructor(container) {
    this._container = container;

    this.getEventsHandler = this.getEventsHandler.bind(this);
  }

  async getEventsHandler(req, response, next) {
    try {
      const paginateEventUseCase = this._container.getInstance(
        PaginateEventUseCase.name,
      );
      const data = await paginateEventUseCase.execute(req.query);
      return response.send({
        status: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new EventsHandler(container);

  router.get('/', handler.getEventsHandler);

  return router;
};
