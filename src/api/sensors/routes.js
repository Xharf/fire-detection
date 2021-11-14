const routes = (handler) => [
    {
        method: 'GET',
        path: '/sensors',
        handler: handler.getSensors,
    },
    {
        method: 'POST',
        path: '/sensors',
        handler: handler.postSensor,
    },
];

module.exports = routes;