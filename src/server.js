const Hapi = require('@hapi/hapi');
require('dotenv').config();

const sensors = require('./api/sensors');
const SensorsService = require('./services/postgres/SensorsService');
const SensorsValidator = require('./validator/sensors');

const init = async () => {
    const sensorsService = new SensorsService();
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
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
    ]);

    await server.start();
    console.log(`Server telah berhasil dijalankan pada ${server.info.uri}`);

}

init();