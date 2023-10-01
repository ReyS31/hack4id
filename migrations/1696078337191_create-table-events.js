/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('events', {
    id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    place_id: {
      type: 'UUID',
      notNull: true,
    },
    thumbnail: {
      type: 'TEXT',
      notNull: true,
    },
    title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      default: pgm.func('Now()'),
    },
  });

  pgm.addConstraint(
    'events',
    'fk_events.place.id',
    'FOREIGN KEY(place_id) REFERENCES places(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('events');
};
