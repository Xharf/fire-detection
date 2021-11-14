const Joi = require('joi');

const SensorPayloadSchema = Joi.object({
    led: Joi.number().min(0).max(1).required(),
});

module.exports = { SensorPayloadSchema };