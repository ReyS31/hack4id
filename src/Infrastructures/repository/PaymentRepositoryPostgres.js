const PaymentRepository = require('../../Domains/payments/PaymentRepository');

class PaymentRepositoryPostgress extends PaymentRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async createOrder(createOrder) {
    const {
      user_id, dyn_id, media_type, total, unpin_at,
    } = createOrder;
    const query = {
      text: 'INSERT INTO payments(user_id, dyn_id, media_type, total, unpin_at) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [user_id, dyn_id, media_type, total, unpin_at],
    };

    return this._pool.query(query);
  }

  async getPayments() {
    const query = {
      text: 'SELECT * FROM payments',
      values: [],
    };

    return this._pool.query(query);
  }
}

module.exports = PaymentRepositoryPostgress;
