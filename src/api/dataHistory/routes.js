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