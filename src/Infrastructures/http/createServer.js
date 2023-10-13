const express = require('express');
const cors = require('cors');
const authentications = require('../../Interfaces/http/api/authentications');
const users = require('../../Interfaces/http/api/users');
const places = require('../../Interfaces/http/api/places');
const categories = require('../../Interfaces/http/api/categories');
const ClientError = require('../../Commons/exceptions/ClientError');
const events = require('../../Interfaces/http/api/events');
const AddEventViewsUseCase = require('../../Applications/use_case/AddEventViewsUseCase');
const payments = require('../../Interfaces/http/api/payments');

const app = express();

module.exports = async (container) => {
  const getClientId = (req, res, next) => {
    const splitted = req.url.split('/');
    splitted.shift();
    const clientId = req.headers['x-client-id'];

    if (splitted.includes('events') && splitted.length > 1 && !splitted.includes('home') && clientId) {
      const addEventViews = container.getInstance(AddEventViewsUseCase.name);
      addEventViews.execute({
        eventId:
          splitted[splitted.length - 1],
        clientId,
      });
    }
    req.clientId = clientId;
    next();
  };

  app.use(express.json());

  if (process.env.NODE_ENV !== 'production') {
    const log = (req, res, next) => {
      // eslint-disable-next-line no-console
      console.log(`${req.method} ${req.url}`);

      next();
    };

    app.use(log);
  }

  app.use(cors());
  app.use(getClientId);
  app.get('/', (_, res) => {
    res.send({
      status: 'success',
      message: 'OK',
    });
  });

  app.use('/authentications', authentications(container));
  app.use('/users', users(container));
  app.use('/categories', categories(container));
  app.use('/payments', payments(container));
  app.use('/places', places(container));
  app.use('/events', events(container));

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
