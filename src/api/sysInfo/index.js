const SysInfoHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'sysInfo',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const sysInfoHandler= new SysInfoHandler(service, validator);
    server.route(routes(sysInfoHandler));
  },
};