const routes = (handler) => [
  {
    method: 'POST',
    path: '/datacustomer',
    handler: handler.postCustomerHandler,
    options: {
      auth: 'customersapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/datacustomer',
    handler: handler.getCustomersHandler,
    options: {
      auth: 'customersapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/datacustomer/{id}',
    handler: handler.getCustomerByIdHandler,
    options: {
      auth: 'customersapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/datacustomer/{id}',
    handler: handler.deleteCustomerByIdHandler,
    options: {
      auth: 'customersapp_jwt',
    },
  },
];
module.exports = routes;
