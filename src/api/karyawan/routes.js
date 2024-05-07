const routes = (handler) => [
  {
    method: 'POST',
    path: '/karyawan',
    handler: handler.postKaryawanHandler,
  },
  {
    method: 'GET',
    path: '/karyawan',
    handler: handler.getKaryawanHandler,
  },
  {
    method: 'PUT',
    path: '/karyawan/{id}',
    handler: handler.putDataKaryawanHandler,
  },
  {
    method: 'DELETE',
    path: '/karyawan/{id}',
    handler: handler.deleteKaryawanByIdHandler,
  },
];

module.exports = routes;
