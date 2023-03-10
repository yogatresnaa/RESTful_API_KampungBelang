/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
class CustomersHandler {
  constructor(service) {
    this._service = service;
    this.postCustomerHandler = this.postCustomerHandler.bind(this);
    this.getCustomersHandler = this.getCustomersHandler.bind(this);
    this.getCustomerByIdHandler = this.getCustomerByIdHandler.bind(this);
    this.deleteCustomerByIdHandler = this.deleteCustomerByIdHandler.bind(this);
  }
  postCustomerHandler(request, h) {
    try {
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
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
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
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
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
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = CustomersHandler;
