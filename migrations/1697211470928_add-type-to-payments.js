/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('payments', {
    media_type: {
      type: 'VARCHAR(20)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn(['media_type']);
};
