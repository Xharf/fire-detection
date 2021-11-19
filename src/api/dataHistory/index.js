const DataHistoryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'dataHistory',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const dataHistoryHandler= new DataHistoryHandler(service, validator);
    server.route(routes(dataHistoryHandler));
  },
};