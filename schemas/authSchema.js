const Joi = require('joi');

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});

const RegisterSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 }),

  password: Joi.string()
    .min(4)
    .required(),

});

module.exports = { LoginSchema, RegisterSchema };
