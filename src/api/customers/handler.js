/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
const ClientError = require('../../exceptions/ClientError');

class CustomersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCustomerHandler = this.postCustomerHandler.bind(this);
    this.getCustomersHandler = this.getCustomersHandler.bind(this);
    this.getCustomerByIdHandler = this.getCustomerByIdHandler.bind(this);
    this.deleteCustomerByIdHandler = this.deleteCustomerByIdHandler.bind(this);
  }
  postCustomerHandler(request, h) {
    try {
      this._validator.validateCustomerPaylod(request.payload);
      const { nama = 'untitled', noHp, email, subjek, pesan } = request.payload;

      const customerId = this._service.addCustomer({ nama, noHp, email, subjek, pesan });
      const response = h.response({
        status: 'success',
        message: 'Data pelanggan berhasil ditambahkan',
        data: {
          customerId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  getCustomersHandler() {
    const customers = this._service.getCustomers();
    return {
      status: 'success',
      data: {
        customers,
      },
    };
  }

  getCustomerByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const customer = this._service.getCustomersById(id);
      return {
        status: 'success',
        data: {
          customer,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  deleteCustomerByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteCustomerById(id);
      return {
        status: 'success',
        message: 'Customer berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = CustomersHandler;
