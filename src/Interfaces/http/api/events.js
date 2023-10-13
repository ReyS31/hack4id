/* eslint-disable consistent-return */
const express = require('express');
const PaginateEventUseCase = require('../../../Applications/use_case/PaginateEventUseCase');
const GetHomeHeadlinesUseCase = require('../../../Applications/use_case/GetHomeHeadlinesUseCase');
const GetEventUseCase = require('../../../Applications/use_case/GetEventUseCase');

class EventsHandler {
  constructor(container) {
    this._container = container;

    this.getEventsHandler = this.getEventsHandler.bind(this);
    this.getEventHandler = this.getEventHandler.bind(this);
    this.getHomeHeadlinesHandler = this.getHomeHeadlinesHandler.bind(this);
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

  async getHomeHeadlinesHandler(req, res, next) {
    try {
      const getHomeHeadlinesUseCase = this._container.getInstance(
        GetHomeHeadlinesUseCase.name,
      );
      const data = await getHomeHeadlinesUseCase.execute();
      return res.send({
        status: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEventHandler(req, res, next) {
    try {
      const { id } = req.params;
      const getEventUseCase = this._container.getInstance(
        GetEventUseCase.name,
      );
      const data = await getEventUseCase.execute(id);
      return res.send({
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
  router.get('/home', handler.getHomeHeadlinesHandler);
  router.get('/:id', handler.getEventHandler);

  return router;
};
