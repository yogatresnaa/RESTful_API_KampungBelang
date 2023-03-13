/* eslint-disable linebreak-style */
const Joi = require('joi');

const CustomerPaylodSchema = Joi.object({
  nama: Joi.string().required(),
  noHp: Joi.string().required(),
  email: Joi.string().required(),
  subjek: Joi.string().required(),
  pesan: Joi.string().required(),
});

module.exports = { CustomerPaylodSchema };
