const Joi = require('joi');

const actionHistoryPayloadSchema = Joi.object({
    sys_device: Joi.string().required(),
    action_name: Joi.string().required(),
    description: Joi.string().required(),
    performed_by: Joi.string().required(),
});

module.exports = { actionHistoryPayloadSchema };