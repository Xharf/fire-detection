const Joi = require('joi');

const DataHistoryPlayloadSchema = Joi.object({
  sys_device : Joi.string().required(),
  humidity: Joi.number().required(),
  temperature: Joi.number().required(),
  gas_density: Joi.number().required(),
  is_there_fire: Joi.boolean().required(),
  ask_for_help: Joi.boolean().required(),
});

module.exports = { DataHistoryPlayloadSchema };