require('dotenv').config();

const Hapi = require('@hapi/hapi');

const sensors = require('./api/sensors');
const SensorsService = require('./services/postgres/SensorsService');
const SensorsValidator = require('./validator/sensors');

const sysInfo = require('./api/sysInfo');
const SysInfoService = require('./services/postgres/sysInfoService');
const SysInfoValidator = require('./validator/sysinfo')

const actionHistory = require('./api/actionHistory');
const ActionHistoryService = require('./services/postgres/ActionHistoryService');
const ActionHistoryValidator = require('./validator/actionhistory');

const init = async () => {
    const sensorsService = new SensorsService();
    const sysInfoService = new SysInfoService();
    const actionHistoryService = new ActionHistoryService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: sensors,
            options: {
                service: sensorsService,
                validator: SensorsValidator,
            },
        },
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
        }
    ]);

    await server.start();
    console.log(`Server telah berhasil dijalankan pada ${server.info.uri}`);

}

init();