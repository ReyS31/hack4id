/* eslint-disable max-classes-per-file */
/* eslint-disable consistent-return */
const express = require('express');
const RefreshAuthenticationUseCase = require('../../../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../Applications/use_case/LogoutUserUseCase');
const LoginUserUseCase = require('../../../Applications/use_case/LoginUserUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, response, next) {
    try {
      const loginUserUseCase = this._container.getInstance(
        LoginUserUseCase.name,
      );
      const { accessToken, refreshToken } = await loginUserUseCase.execute(
        request.body,
      );
      return response.status(201).send({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putAuthenticationHandler(request, response, next) {
    try {
      const refreshAuthenticationUseCase = this._container.getInstance(
        RefreshAuthenticationUseCase.name,
      );
      const accessToken = await refreshAuthenticationUseCase.execute(
        request.payload,
      );

      return response.send({
        status: 'success',
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAuthenticationHandler(request, response, next) {
    try {
      const logoutUserUseCase = this._container.getInstance(
        LogoutUserUseCase.name,
      );
      await logoutUserUseCase.execute(request.payload);
      return response.send({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new AuthenticationsHandler(container);

  router.post('/', handler.postAuthenticationHandler);
  router.put('/', handler.putAuthenticationHandler);
  router.delete('/', handler.deleteAuthenticationHandler);

  return router;
};
