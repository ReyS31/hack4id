/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('payments', {
    id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    user_id: {
      type: 'UUID',
      notNull: true,
    },
    dyn_id: {
      type: 'UUID',
      notNull: true,
    },
    total: {
      type: 'INTEGER',
    },
    unpin_at: {
      type: 'TIMESTAMPTZ',
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      default: pgm.func('Now()'),
    },
  });

  pgm.addConstraint(
    'payments',
    'fk_payments.user.id',
    'FOREIGN KEY(user_id) REFERENCES users(id)',
  );

  pgm.createIndex(
    'payments',
    'dyn_id',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('payments', {
    ifExists: true,
  });
};
