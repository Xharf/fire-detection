const routes = (handler) => [
    {
        method: 'GET',
        path: '/sysinfo',
        handler: handler.getSysInfoHandler,
    },
    {
        method: 'GET',
        path: '/sysinfo/{id}',
        handler: handler.getSysInfoByIdHandler,
    },
    {
        method: 'POST',
        path: '/sysinfo',
        handler: handler.postSysInfoHandler,
    },
    {
        method: 'PUT',
        path: '/sysinfo/{id}',
        handler: handler.putSysInfoByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/sysinfo/{id}',
        handler: handler.deleteSysInfoByIdHandler,
    }
];


module.exports = routes;

