const Joi = require('@hapi/joi');

exports.signUpSchema = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .min(3)
        .max(255)
        .required(),
    password: Joi
        .string()
        .trim()
        .min(6)
        .max(50)
        .required(),
    email: Joi
        .string()
        .lowercase()
        .trim()
        .email({ minDomainSegments: 2 })
        .required(),
});
