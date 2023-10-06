const express = require('express');
const authentications = require('../../Interfaces/http/api/authentications');
const users = require('../../Interfaces/http/api/users');

const app = express();

module.exports = async (container) => {
  app.set(express.json());

  app.get('/', (_, res) => {
    res.send({
      status: 'success',
      message: 'OK',
    });
  });
  
  app.use(authentications(container));
  app.use(users(container));

  app.use((_, res) => {
    res.status(404).send({
      status: 'fail',
      message: 'NOT FOUND',
    });
  });

  return app;
};
