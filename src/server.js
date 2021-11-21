require('dotenv').config();

const Hapi = require('@hapi/hapi');

const sysInfo = require('./api/sysInfo');
const SysInfoService = require('./services/postgres/sysInfoService');
const SysInfoValidator = require('./validator/sysinfo')

const actionHistory = require('./api/actionHistory');
const ActionHistoryService = require('./services/postgres/actionHistoryService');
const ActionHistoryValidator = require('./validator/actionhistory');

const sysHistory = require('./api/sysHistory');
const SysHistoryService = require('./services/postgres/sysHistoryService');
const sysHistoryValidator = require('./validator/syshistory');

const dataHistory = require('./api/dataHistory');
const DataHistoryService = require('./services/postgres/dataHistoryService');
const dataHistoryValidator = require('./validator/datahistory');

const init = async () => {
    const sysInfoService = new SysInfoService();
    const actionHistoryService = new ActionHistoryService();
    const sysHistoryService = new SysHistoryService();
    const dataHistoryService = new DataHistoryService();

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: sysInfo,
            options: {
                service: sysInfoService,
                validator: SysInfoValidator,
            }
        },
        {
            plugin: actionHistory,
            options: {
                service: actionHistoryService,
                validator: ActionHistoryValidator,
            }
        },
        {
            plugin: sysHistory,
            options: {
                service: sysHistoryService,
                validator: sysHistoryValidator,
            }
        },
        {
            plugin: dataHistory,
            options: {
                service: dataHistoryService,
                validator: dataHistoryValidator,
            }
        },
    ]);

    await server.start();
    console.log(`Server telah berhasil dijalankan pada ${server.info.uri}`);

}

init();