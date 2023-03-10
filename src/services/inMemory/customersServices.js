/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');

class CustomerServices {
  constructor() {
    this._customers = [];
  }

  addCustomer({ nama, noHp, email, subjek, pesan }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();

    const newCustomer = {
      nama,
      noHp,
      email,
      subjek,
      pesan,
      id,
      createdAt,
    };
    this._customers.push(newCustomer);
    const isSuccess = this._customers.filter((customer) => customer.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Customer gagal ditambahkan');
    }
    return id;
  }

  getCustomers() {
    return this._customers;
  }

  getCustomersById(id) {
    const customer = this._customers.filter((n) => n.id === id)[0];
    if (!customer) {
      throw new Error('Customer tidak ditemukan');
    }
    return customer;
  }

  deleteCustomerById(id) {
    const index = this._customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new Error('Customer gagal dihapus, Id tidak ditemukan');
    }
    this._customers.splice(index, 1);
  }
}
module.exports = CustomerServices;
