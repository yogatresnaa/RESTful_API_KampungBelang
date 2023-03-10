/* eslint-disable linebreak-style */
const CustomersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const customerHandler = new CustomersHandler(service);
    server.route(routes(customerHandler));
  },
};
