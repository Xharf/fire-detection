const Joi = require('joi');

const SysInfoPayloadSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
});

module.exports = { SysInfoPayloadSchema };