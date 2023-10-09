const express = require('express');
const GetCategoriesUseCase = require('../../../Applications/use_case/GetCategoriesUseCase');

class CategoriesHandler {
  constructor(container) {
    this._container = container;

    this.getCategoriesHandler = this.getCategoriesHandler.bind(this);
  }

  async getCategoriesHandler(_, response) {
    const getCategoriesUseCase = this._container.getInstance(
      GetCategoriesUseCase.name,
    );
    const data = await getCategoriesUseCase.execute();
    return response.send({
      status: 'success',
      data,
    });
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new CategoriesHandler(container);

  router.get('/', handler.getCategoriesHandler);

  return router;
};
