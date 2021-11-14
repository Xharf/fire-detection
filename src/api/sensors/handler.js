const ClientError = require('../../exceptions/ClientError');

class SensorsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.getSensors = this.getSensors.bind(this);
        this.postSensor = this.postSensor.bind(this);
    }
    
    async getSensors(requrest, h) {
        return "test"
    }

    async postSensor(requrest, h) {
        return "test";
    }
}

module.exports = SensorsHandler;