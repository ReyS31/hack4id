/* eslint-disable consistent-return */
const express = require('express');
const moment = require('moment');
const CreateOrderPinUseCase = require('../../../Applications/use_case/CreateOrderPinUseCase');

class PaymentsHandler {
  constructor(container) {
    this._container = container;

    this.postPaymentHandler = this.postPaymentHandler.bind(this);
  }

  async postPaymentHandler(req, response, next) {
    try {
      const { date } = req.body;
      const pricePerDay = Number(process.env.PRICE_PER_DAY);
      const unpin = moment(date);
      const diffInDays = unpin.diff(moment(), 'days');
      const total = pricePerDay * diffInDays;

      const createOrderPinUseCase = this._container.getInstance(
        CreateOrderPinUseCase.name,
      );

      await createOrderPinUseCase.execute({
        unpin_at: unpin.toISOString(),
        total,
        ...req.body,
      });

      return response.send({
        status: 'success',
        // data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = (container) => {
  const router = express.Router();
  const handler = new PaymentsHandler(container);

  router.post('/', handler.postPaymentHandler);

  return router;
};
