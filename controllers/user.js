const Joi = require('@hapi/joi');
const db = require('../db');
const userModel = require('../models/user');
const userValidator = require('../validations/user');
const hashingUtil = require('../utils/hashing');

exports.registeruser = async (req, res) => {
    const validationResult = Joi.validate(req.body, userValidator.signUpSchema);
    if (validationResult.error) {
        res.status(400).json({ message: validationResult.error.details[0].message });
    } else {
        const userDetails = validationResult.value;
        try {
            const hashedPassword = await hashingUtil.generateHash(userDetails.password);
            const user = await userModel.getUserByEmail(userDetails.email);
            res.status(409).json({
                message: 'Email already exists',
            });
        } catch (error) {
            if (error.name === 'UserNotFoundError') {
                try {
                    const savedUser = await userModel.createuser({
                        firstname: userDetails.firstname,
                        lastname: userDetails.lastname,
                        mobileNo: userDetails.mobileNo,
                        email: userDetails.email,
                        password: userDetails.password,
                    });
                    // eslint-disable-next-line no-console
                    res.status(201).json(savedUser);
                } catch (saveErr) {
                    throw saveErr;
                }
            } else {
                res.status(500).json({
                    message: 'Something went wrong',
                });
            }
        }
    }
};
