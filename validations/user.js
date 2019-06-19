const Joi = require('@hapi/joi');

exports.signUpSchema = Joi.object().keys({
    firstname: Joi
        .string()
        .trim()
        .min(3)
        .max(255)
        .required(),
    lastname: Joi
        .string()
        .trim()
        .min(3)
        .max(255),
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
    mobileNo: Joi
        .number()
        .min(10)
        .required(),
});

exports.loginSchema = Joi.object().keys({
    password: Joi
        .string()
        .trim()
        .required(),
    email: Joi
        .string()
        .lowercase()
        .trim()
        .email({ minDomainSegments: 2 })
        .required(),
});

exports.todoListSchema = Joi.object().keys({
    task: Joi
        .string()
        .trim()
        .min(3)
        .max(255)
        .required(),
    date: Joi
        .date(),

});
