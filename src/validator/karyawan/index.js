const InvariantError = require('../../exceptions/InvariantError');
const { KaryawanPaylodSchema } = require('./schema');

const KaryawanValidator = {
  validateKaryawanPaylod: (payload) => {
    const validationResult = KaryawanPaylodSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = KaryawanValidator;
