/* eslint-disable linebreak-style */
const InvariantError = require('../../exceptions/InvariantError');
const { CustomerPaylodSchema } = require('./schema');

const CustomerValidator = {
  validateCustomerPaylod: (payload) => {
    const validationResult = CustomerPaylodSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = CustomerValidator;
