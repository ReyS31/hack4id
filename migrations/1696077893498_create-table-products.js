/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    place_id: {
      type: 'UUID',
      notNull: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    price: {
      type: 'INTEGER',
      notNull: true,
    },
    discounted_price: {
      type: 'INTEGER',
    },
    discount: {
      type: 'BOOLEAN',
      default: false,
    },
    pinned: {
      type: 'BOOLEAN',
      default: false,
    },
    available: {
      type: 'BOOLEAN',
      default: false,
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      default: pgm.func('Now()'),
    },
  });

  pgm.addConstraint(
    'products',
    'fk_products.place.id',
    'FOREIGN KEY(place_id) REFERENCES places(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
