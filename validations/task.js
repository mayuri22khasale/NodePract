const Joi = require('@hapi/joi');

exports.taskSchema = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .min(3)
        .max(255)
        .required(),
    date: Joi
        .date(),
    status: Joi
        .string(),
});
