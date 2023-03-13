/* eslint-disable linebreak-style */
const { CustomerPaylodSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const CustomerValidator = {
  validateCustomerPaylod: (payload) => {
    const validationResult = CustomerPaylodSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = CustomerValidator;
