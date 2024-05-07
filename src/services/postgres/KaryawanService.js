const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class KaryawanService {
  constructor() {
    this._pool = new Pool();
  }

  async addKaryawan({ nama, alamat, noHp, awalmasuk, posisi, gaji }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO karyawan VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, nama, alamat, noHp, awalmasuk, posisi, gaji],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Karyawan gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getKaryawan() {
    const result = await this._pool.query('SELECT * FROM karyawan');
    return result.rows;
  }

  async editKaryawanById(id, { nama, alamat, noHp, awalmasuk, posisi, gaji }) {
    const query = {
      text: 'UPDATE karyawan SET nama = $1, alamat = $2, noHp = $3, awalmasuk = $4, posisi = $5, gaji = $6 WHERE id = $7 RETURNING id',
      values: [nama, alamat, noHp, awalmasuk, posisi, gaji, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui data karyawan. Id tidak ditemukan');
    }
  }

  async deleteKaryawanById(id) {
    const query = {
      text: 'DELETE FROM karyawan WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Karyawan gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = KaryawanService;
