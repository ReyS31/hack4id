const express = require('express');
const PaginatePlaceUseCase = require('../../../Applications/use_case/PaginatePlaceUseCase');
const GetPlaceUseCase = require('../../../Applications/use_case/GetPlaceUseCase');

class PlacesHandler {
  constructor(container) {
    this._container = container;

    this.getPlacesHandler = this.getPlacesHandler.bind(this);
    this.getPlaceHandler = this.getPlaceHandler.bind(this);
  }

  async getPlacesHandler(request, response) {
    const getPlacesUseCase = this._container.getInstance(
      PaginatePlaceUseCase.name,
    );
    const data = await getPlacesUseCase.execute(request.query);
    return response.send({
      status: 'success',
      data,
    });
  }

  async getPlaceHandler(request, response) {
    const { id } = request.params;
    const getPlacesUseCase = this._container.getInstance(GetPlaceUseCase.name);
    const data = await getPlacesUseCase.execute(id);
    return response.send({
      status: 'success',
      data,
    });
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new PlacesHandler(container);

  router.get('/', handler.getPlacesHandler);
  router.get('/:id', handler.getPlaceHandler);

  return router;
};
