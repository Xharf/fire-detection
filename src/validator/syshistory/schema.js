const Joi = require('joi');

const SysHistoryPayloadSchema = Joi.object({
  sys_device: Joi.string().required(),
  wifi_status: Joi.string().required(),
  bluetooth_status: Joi.string().required(),
  dht_status: Joi.string().required(),
  flame_status: Joi.string().required(),
  mq_status: Joi.string().required(),
});

module.exports = { SysHistoryPayloadSchema };