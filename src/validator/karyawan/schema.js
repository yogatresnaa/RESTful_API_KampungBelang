const Joi = require('joi');

const KaryawanPaylodSchema = Joi.object({
  nama: Joi.string().required(),
  alamat: Joi.string().required(),
  noHp: Joi.string().required(),
  awalmasuk: Joi.string().required(),
  posisi: Joi.string().required(),
  gaji: Joi.string().required(),
});

module.exports = { KaryawanPaylodSchema };
