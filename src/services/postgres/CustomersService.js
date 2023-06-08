/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */

/* eslint-disable linebreak-style */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CustomersService {
  constructor() {
    this._pool = new Pool();
  }

  async addCustomer({ nama, noHp, email, subjek, pesan }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO customers VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING id',
      values: [id, nama, noHp, email, subjek, pesan, createdAt],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Customer gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getCustomers() {
    const result = await this._pool.query('SELECT * FROM customers');
    return result.rows;
  }

  async getCustomersById(id) {
    const query = {
      text: 'SELECT * FROM customers WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Customer tidak ditemukan');
    }
    return result.rows[0];
  }

  async deleteCustomerById(id) {
    const query = {
      text: 'DELETE FROM customers WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Customer tidak ditemukan');
    }
  }
}

module.exports = CustomersService;
