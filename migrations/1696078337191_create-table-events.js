/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('events', {
    id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    user_id: {
      type: 'UUID',
      notNull: true,
    },
    thumbnail: {
      type: 'TEXT',
      notNull: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    preview: {
      type: 'TEXT',
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    views: {
      type: 'INTEGER',
      default: 0,
    },
    pinned: {
      type: 'BOOLEAN',
      default: false,
    },
    pinned_until: {
      type: 'TIMESTAMPTZ',
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      default: pgm.func('Now()'),
    },
  });

  pgm.addConstraint(
    'events',
    'fk_events.user.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('events');
};
