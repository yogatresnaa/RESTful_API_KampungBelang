/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const customer = require('./api/customers');
const CustomerService = require('./services/postgres/CustomersService');
const CustomerValidator = require('./validator/customers');

const init = async () => {
  const customerService = new CustomerService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: customer,
    options: {
      service: customerService,
      validator: CustomerValidator,
    },
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
