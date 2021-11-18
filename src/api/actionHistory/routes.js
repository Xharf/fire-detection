const routes = (handler) => [
  {
      method: 'GET',
      path: '/actionhistory',
      handler: handler.getActionHistoryHandler,
  },
  {
      method: 'GET',
      path: '/actionhistory/{id}',
      handler: handler.getActionHistoryByIdHandler,
  },
  {
      method: 'POST',
      path: '/actionhistory',
      handler: handler.postActionHistoryHandler,
  },
  {
      method: 'DELETE',
      path: '/actionhistory/{id}',
      handler: handler.deleteActionHistoryByIdHandler,
  }
];


module.exports = routes;

