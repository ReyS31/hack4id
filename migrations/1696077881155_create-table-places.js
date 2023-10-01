/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('places', {
    id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    user_id: {
      type: 'UUID',
      notNull: true,
    },
    category_id: {
      type: 'UUID',
      notNull: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    phone: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    email: {
      type: 'VARCHAR(50)',
      unique: true,
    },
    address: {
      type: 'TEXT',
      notNull: true,
    },
    social_media: {
      type: 'JSON',
    },
    location: {
      type: 'GEOMETRY',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      default: pgm.func('Now()'),
    },
  });

  pgm.addConstraint(
    'places',
    'fk_places.user.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('places');
};
