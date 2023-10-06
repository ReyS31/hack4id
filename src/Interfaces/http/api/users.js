const express = require('express');
const AddUserUseCase = require('../../../Applications/use_case/AddUserUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, response) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    return response
      .send({
        status: 'success',
        data: {
          addedUser,
        },
      })
      .status(201);
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new UsersHandler(container);

  router.post('/users', handler.postUserHandler);

  return router;
};
