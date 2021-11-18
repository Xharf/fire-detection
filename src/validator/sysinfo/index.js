const InvariantError = require('../../exceptions/InvariantError');
const { SysInfoPayloadSchema } = require('./schema');

const SysInfoValidator = {
    validateSysInfoPayload: (payload) => {
        const validationResult = SysInfoPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SysInfoValidator;