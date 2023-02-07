/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
const { nanoid } = require('nanoid');
const customers = require('./customer');

const addCustomerHandler = (request, h) => {
  const { nama, noHp, email, subjek, pesan } = request.payload;
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
  customers.push(newCustomer);
  const isSuccess = customers.filter((customer) => customer.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data pelanggan berhasil ditambahkan',
      data: {
        customerId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data pelanggan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllCustomerHandler = () => ({
  status: 'success',
  data: {
    customers,
  },
});

const getCustomerByIdHandler = (request, h) => {
  const { id } = request.params;

  const customer = customers.filter((n) => n.id === id)[0];

  if (customer !== undefined) {
    return {
      status: 'success',
      data: {
        customer,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Customer tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteCustomerByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = customers.findIndex((customer) => customer.id === id);

  if (index !== -1) {
    customers.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Customer berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Customer gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addCustomerHandler,
  getAllCustomerHandler,
  getCustomerByIdHandler,
  deleteCustomerByIdHandler,
};
