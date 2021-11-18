const routes = (handler) => [
  {
    method: 'GET',
    path: '/syshistory',
    handler: handler.getSysHistoryHandler,
  },
  {
    method: 'POST',
    path: '/syshistory',
    handler: handler.postSysHistoryHandler,
  },
  {
    method: 'GET',
    path: '/syshistory/{id}',
    handler: handler.getSysHistoryByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/syshistory/{id}',
    handler: handler.deleteSysHistoryByIdHandler,
  }
];

module.exports = routes;