const express = require('express');
const cors = require('cors');
const authentications = require('../../Interfaces/http/api/authentications');
const users = require('../../Interfaces/http/api/users');
const places = require('../../Interfaces/http/api/places');
const categories = require('../../Interfaces/http/api/categories');

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

  app.use(authentications(container));
  app.use(users(container));
  app.use('/categories', categories(container));
  app.use('/places', places(container));

  app.use((_, res) => {
    res.status(404).send({
      status: 'fail',
      message: 'NOT FOUND',
    });
  });

  return app;
};
