const CreateOrder = require('../../Domains/payments/entities/CreateOrder');

class CreateOrderPinUseCase {
  constructor({ paymentRepository, placeRepository, eventRepository }) {
    this._paymentRepository = paymentRepository;
    this._placeRepository = placeRepository;
    this._eventRepository = eventRepository;
  }

  async execute(useCasePayload) {
    const createOrder = new CreateOrder(useCasePayload);
    if (createOrder.media_type === 'event') {
      await this._eventRepository.verifyEventExists(createOrder.dyn_id);
      await this._paymentRepository.createOrder(createOrder);
      return this._eventRepository.activatePin(
        createOrder.dyn_id,
        createOrder.unpin_at,
      );
    }

    if (createOrder.media_type === 'place') {
      await this._placeRepository.verifyPlaceExists(createOrder.dyn_id);
      await this._paymentRepository.createOrder(createOrder);
      return this._placeRepository.activatePin(
        createOrder.dyn_id,
        createOrder.unpin_at,
      );
    }

    return 'ERR';
  }
}

module.exports = CreateOrderPinUseCase;
