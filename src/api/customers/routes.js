/* eslint-disable linebreak-style */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/datacustomer',
    handler: handler.postCustomerHandler,
  },
  {
    method: 'GET',
    path: '/datacustomer',
    handler: handler.getCustomersHandler,
  },
  {
    method: 'GET',
    path: '/datacustomer/{id}',
    handler: handler.getCustomerByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/datacustomer/{id}',
    handler: handler.deleteCustomerByIdHandler,
  },
];
module.exports = routes;
