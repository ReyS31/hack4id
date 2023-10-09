const express = require('express');
const PaginatePlaceUseCase = require('../../../Applications/use_case/PaginatePlaceUseCase');

class PlacesHandler {
  constructor(container) {
    this._container = container;

    this.getPlacesHandler = this.getPlacesHandler.bind(this);
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
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new PlacesHandler(container);

  router.get('/', handler.getPlacesHandler);

  return router;
};
