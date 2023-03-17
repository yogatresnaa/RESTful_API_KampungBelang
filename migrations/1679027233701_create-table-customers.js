/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('customers', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama: {
      type: 'TEXT',
      notNull: true,
    },
    noHp: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(40)',
      notNull: true,
    },
    subjek: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    pesan: {
      type: 'TEXT',
      notNull: true,
    },
    createdAt: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('notes');
};
