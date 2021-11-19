const InvariantError = require('../../exceptions/InvariantError');
const { DataHistoryPlayloadSchema } = require('./schema');

const DataHistoryValidator = {
  validateDataHistoryPayload: (payload) => {
      const validationResult = DataHistoryPlayloadSchema.validate(payload);

      if (validationResult.error) {
          throw new InvariantError(validationResult.error.message);
      }
  },
};

module.exports = DataHistoryValidator;