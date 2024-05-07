const KaryawanHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'karyawan',
  version: '1.0.0',
  register: async (server, { service }) => {
    const karyawanHandler = new KaryawanHandler(service);
    server.route(routes(karyawanHandler));
  },
};
