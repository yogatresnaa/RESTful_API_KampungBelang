const ClientError = require('../../exceptions/ClientError');

class KaryawanHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postKaryawanHandler = this.postKaryawanHandler.bind(this);
    this.getKaryawanHandler = this.getKaryawanHandler.bind(this);
    this.deleteKaryawanByIdHandler = this.deleteKaryawanByIdHandler.bind(this);
    this.putDataKaryawanHandler = this.putDataKaryawanHandler.bind(this);
  }

  async postKaryawanHandler(request, h) {
    try {
      // this._validator.validateKaryawanPaylod(request.payload);
      const { nama = 'fulan', alamat, noHp, awalmasuk, posisi, gaji } = request.payload;
      const karyawanId = await this._service.addKaryawan({ nama, alamat, noHp, awalmasuk, posisi, gaji });

      const response = h.response({
        status: 'succes',
        message: 'karyawan berhasil ditambahkan',
        data: {
          karyawanId,
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

  async getKaryawanHandler() {
    const karyawan = await this._service.getKaryawan();
    return {
      status: 'succes',
      data: {
        karyawan,
      },
    };
  }

  async putDataKaryawanHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.editKaryawanById(id, request.payload);
      return {
        status: 'success',
        message: 'Karyawan berhasil diperbarui',
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

  async deleteKaryawanByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteKaryawanById(id);
      return {
        status: 'success',
        message: 'Karyawan berhasil dihapus',
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

module.exports = KaryawanHandler;
