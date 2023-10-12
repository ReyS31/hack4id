const express = require('express');
const cors = require('cors');
const authentications = require('../../Interfaces/http/api/authentications');
const users = require('../../Interfaces/http/api/users');
const places = require('../../Interfaces/http/api/places');
const categories = require('../../Interfaces/http/api/categories');
const ClientError = require('../../Commons/exceptions/ClientError');

const app = express();

module.exports = async (container) => {
  const log = (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.url}`);

    next();
  };

  app.set(express.json());
  app.use(cors());

  app.use(log);
  app.get('/', (_, res) => {
    res.send({
      status: 'success',
      message: 'OK',
    });
  });

  app.use('/authentications', authentications(container));
  app.use('/users', users(container));
  app.use('/categories', categories(container));
  app.use('/places', places(container));

  app.use((_, res) => {
    res.status(404).send({
      status: 'fail',
      message: 'NOT FOUND',
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, _, response, __) => {
    if (err instanceof ClientError) {
      return response.status(err.statusCode).send({
        status: 'fail',
        message: err.message,
      });
    }

    return response.status(500).send({
      status: 'fail',
      message: err.message,
    });
  });

  return app;
};
