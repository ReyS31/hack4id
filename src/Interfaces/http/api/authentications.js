const express = require('express');
const LoginUserUseCase = require('../../../Applications/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../../../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../Applications/use_case/LogoutUserUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, response) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(
      request.payload,
    );
    return response.status(201).send({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  async putAuthenticationHandler(request, response) {
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
  }

  async deleteAuthenticationHandler(request, response) {
    const logoutUserUseCase = this._container.getInstance(
      LogoutUserUseCase.name,
    );
    await logoutUserUseCase.execute(request.payload);
    return response.send({
      status: 'success',
    });
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new AuthenticationsHandler(container);

  router.post('/authentications', handler.postAuthenticationHandler);
  router.put('/authentications', handler.putAuthenticationHandler);
  router.delete('/authentications', handler.deleteAuthenticationHandler);

  return router;
};
