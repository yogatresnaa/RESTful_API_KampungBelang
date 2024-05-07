/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('karyawan', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama: {
      type: 'TEXT',
      notNull: true,
    },
    alamat: {
      type: 'TEXT',
      notNull: true,
    },
    noHp: {
      type: 'TEXT',
      notNull: true,
    },
    awalmasuk: {
      type: 'TEXT',
      notNull: true,
    },
    posisi: {
      type: 'TEXT',
      notNull: true,
    },
    gaji: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('karyawan');
};
