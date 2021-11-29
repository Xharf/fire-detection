const routes = (handler) => [
  {
    method: 'GET',
    path: '/datahistory',
    handler: handler.getDataHistoryHandler,
  },
  {
    method: 'GET',
    path: '/datahistory/{id}',
    handler: handler.getDataHistoryByIdHandler,
  },
  {
    method: 'GET',
    path: '/lastdatahistory/{sys_device}',
    handler: handler.getLastDataHistoryHandler,
  },
  {
    method: 'GET',
    path: '/datahistory/sid/{id}',
    handler: handler.getDataHistoryByDeviceIdHandler,
  },
  {
    method: 'POST',
    path: '/datahistory',
    handler: handler.postDataHistoryHandler,
  },
  {
    method: 'DELETE',
    path: '/datahistory/{id}',
    handler: handler.deleteDataHistoryByIdHandler,
  }
];

module.exports = routes;