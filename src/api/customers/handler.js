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

  async postCustomerHandler(request, h) {
    try {
      this._validator.validateCustomerPaylod(request.payload);
      const { nama = 'untitled', noHp, email, subjek, pesan } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const customerId = await this._service.addCustomer({ nama, noHp, email, subjek, pesan, owner: credentialId });
      const response = h.response({
        status: 'success',
        message: 'Pesan Anda Terkirim',
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

      // server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getCustomersHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const customers = await this._service.getCustomers(credentialId);
    return {
      status: 'success',
      data: {
        customers,
      },
    };
  }

  async getCustomerByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyNoteOwner(id, credentialId);

      const customer = await this._service.getCustomersById(id);
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

  async deleteCustomerByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyCustomerOwner(id, credentialId);

      await this._service.deleteCustomerById(id);
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
