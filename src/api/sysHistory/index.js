const SysHistoryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'SysHistory',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const sysHistoryHandler= new SysHistoryHandler(service, validator);
    server.route(routes(sysHistoryHandler));
  },
};