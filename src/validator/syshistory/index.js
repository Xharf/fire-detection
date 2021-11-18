const InvariantError = require('../../exceptions/InvariantError');
const { SysHistoryPayloadSchema } = require('./schema');

const SysHistoryValidator = {
    validateSysHistoryPayload: (payload) => {
        const validationResult = SysHistoryPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SysHistoryValidator;