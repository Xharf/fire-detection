const InvariantError = require('../../exceptions/InvariantError');
const { actionHistoryPayloadSchema } = require('./schema');

const ActionHistoryValidator = {
    validateActionHistoryPayload: (payload) => {
        const validationResult = actionHistoryPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = ActionHistoryValidator;