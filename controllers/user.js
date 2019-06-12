const Joi = require('@hapi/joi');

const userModel = require('../models/user');
const userValidator = require('../validations/user');

exports.registeruser = (req, res) => {
    const validationResult = Joi.validate(req.body, userValidator.signUpSchema);
    if (validationResult.error) {
        res.status(400).json({ message: validationResult.error.details[0].message });
    } else {
        const userDetails = validationResult.value;
        const savedUser = userModel.createuser(
            userDetails.name,
            userDetails.email,
            userDetails.password,
        );
        // eslint-disable-next-line no-console
        res.status(201).json(savedUser);
    }
};
