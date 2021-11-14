const InvariantError = require('../../exceptions/InvariantError');
const { SensorPayloadSchema } = require('./schema');

const SensorValidator = {
    validateSensorPayload: (payload) => {
        const validationResult = SensorPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SensorValidator;