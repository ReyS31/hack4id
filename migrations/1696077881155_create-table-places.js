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
    thumbnail: {
      type: 'TEXT',
      notNull: true,
    },
    phone: {
      type: 'VARCHAR(50)',
    },
    email: {
      type: 'VARCHAR(50)',
    },
    address: {
      type: 'TEXT',
      notNull: true,
    },
    social_media: {
      type: 'JSON',
    },
    location: {
      type: 'geography(POINT,4326)',
      notNull: true,
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
    'places',
    'fk_places.user.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'places',
    'fk_places.category.id',
    'FOREIGN KEY(category_id) REFERENCES categories(id)',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('places');
};
