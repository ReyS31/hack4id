/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('event_views', {
    id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    viewer_id: {
      type: 'TEXT',
      notNull: true,
    },
    event_id: {
      type: 'UUID',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      default: pgm.func('Now()'),
    },
  });

  pgm.addConstraint(
    'event_views',
    'fk_event_views.event.id',
    'FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('event_views');
};
