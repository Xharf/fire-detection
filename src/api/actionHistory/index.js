const ActionHistoryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Action History',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const actionHistoryHandler = new ActionHistoryHandler(service, validator);
    server.route(routes(actionHistoryHandler));
  },
};