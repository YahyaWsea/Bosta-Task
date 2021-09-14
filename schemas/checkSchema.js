const Joi = require('joi');

const CheckSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  url: Joi.string()
    .min(5)
    .required(),
  protocol: Joi.any().allow('http', 'https', 'tcp').required(),

  path: Joi.string().allow('', null),
  port: Joi.string().allow('', null),
  webHook: Joi.string().allow('', null),
  timeout: Joi.number().default(5),
  interval: Joi.number().default(10),
  threshold: Joi.number().default(1),
  authentication: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
  httpheaders: Joi.array(),
  tags: Joi.array(),
  ignoreSSL: Joi.boolean(),
});

module.exports = { CheckSchema };
