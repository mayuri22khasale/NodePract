const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const userModel = require('../models/user');
const userValidator = require('../validations/user');
const hashingUtil = require('../utils/hashing');

const userRef = db.collection('users');
exports.registeruser = async (req, res) => {
    const validationResult = Joi.validate(req.body, userValidator.signUpSchema);
    if (validationResult.error) {
        res.status(400).json({ message: validationResult.error.details[0].message });
    } else {
        const userDetails = validationResult.value;
        try {
            const user = await userModel.getUserByEmail(userDetails.email);
            res.status(409).json({
                message: 'Email already exists',
            });
        } catch (error) {
            if (error.name === 'UserNotFoundError') {
                try {
                    const hashedPassword = await hashingUtil.generateHash(userDetails.password);
                    const savedUser = await userModel.createuser({
                        firstname: userDetails.firstname,
                        lastname: userDetails.lastname,
                        mobileNo: userDetails.mobileNo,
                        email: userDetails.email,
                        password: hashedPassword,
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

exports.login = async (req, res) => {
    const validationResult = Joi.validate(req.body, userValidator.loginSchema);
    if (validationResult.error) {
        res.status(400).json({
            message: 'wrong email or password',
        });
    } else {
        try {
            const credentials = validationResult.value;
            const userDetails = await userModel.getUserByEmail(credentials.email);
            const isEqual = await hashingUtil.compareHash(credentials.password, userDetails.password);
            if (isEqual) {
                res.json({
                    userDetails,
                });
            } else {
                res.status(400).json({
                    message: 'wrong email or password',
                });
            }
        } catch (error) {
            if (error.name === 'UserNotFoundError') {
                res.status(404).json({
                    message: 'Email not found',
                });
            } else {
                throw error;
            }
        }
    }
};
// exports.loginuser = async (req, res) => {
//     const validationResult = Joi.validate(req.body, userValidator.signUpSchema);
//     const userDetails = validationResult.value;
//     const hashedPassword = await hashingUtil.generateHash(userDetails.password);
//     const user = await userModel.getUserByEmail(userDetails.email);
//     if (!user) {
//         const error = new Error('Email id not found');
//         error.statusCode = 401;
//     }else {
//     }
//     const email = req.body.email;
//     console.log('email in login api-->', email);
//     const password = req.body.password;
//     res.status(409).json({
//         message: 'Email already exists',
//     });
// };

// exports.createTodolist = async (req, res) => {
//     const task = req.body.task;
//     console.log('check taaassskk---->', task);
//     const validationResult = Joi.validate(req.body, userValidator.todoListSchema);
//     if (validationResult.error) {
//         res.status(400).json({ message: validationResult.error.details[0].message });
//     } else {
//         const taskDetails = validationResult.value;
//         try {
//             const savedTask = await userModel.createTodolist(taskDetails.task);
//             res.status(201).json({
//                 message: 'Task not found',
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Something went wrong',
//             });
//         }
//     }
// };

// exports.createTodolist = (req, res, next) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         return res.status(422).json({ message: 'validation failed',error: error.arry() });
//     }
//     const task = req.body.task;
//     const date = req.body.date;
//     res.status(200).json({
//         message: 'task created',
//         task: { id: new Date().toDateString(), task, date },
//     });
// };

// code with pagination
// exports.getTodolist = (req, res) => {
//     const date = req.params.date;
//     const task = req.params.task;

//     if (!date) {
//         const error = new Error('tasssssk not ound');
//         error.statusCode = 400;
//         throw error;
//     } else {
//         const query = userRef.where('task', '==', task);
//         const userSnapShot = query.get();
//         console.log('usersnapshopt----->', userSnapShot);
//         if (userSnapShot.empty) {
//             const taskNotFoundError = new Error('task not found');
//             taskNotFoundError.name = 'TaskNotFoundError';
//             res.status(409).json({
//                 message: 'Task nooooot found',
//             });
//         } else {
//             userSnapShot.forEach((doc,count) => {
//                 const page = req.query.page || 1;
//                 const viewPage = 2;
//                 const pageCount=count;
//                 if(pageCount<1){
//                     skip((page-1) *viewPage);
//                     limit(viewPage);
//                 }
//                 res.status(200).json({
//                     message: 'Task found',
//                 });
//             });
//         }
//     }
// };
// code with pagination

// exports.getTodolist = function (task) {
//     return new Promise((async (resolve, reject) => {
//         try {
//             const query = userRef.where('task', '==', task);
//             const userSnapShot = await query.get();
//             if (userSnapShot.empty) {
//                 const taskNotFoundError = new Error('task not found');
//                 taskNotFoundError.name = 'TaskNotFoundError';
//                 reject(taskNotFoundError);
//             } else {
//                 userSnapShot.forEach((doc) => {
//                     resolve(doc.data());
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     }));
// };

// exports.login = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const validationResult = Joi.validate(req.body, userValidator.signUpSchema);
//     if (validationResult.error) {
//         res.status(400).json({ message: validationResult.error.details[0].message });
//     } else {
//         const userDetails = validationResult.value;
//         try {
//             const hashedPassword = await hashingUtil.generateHash(userDetails.password);
//             console.log('hashedPassword---->',hashedPassword);
//             const user = await userModel.getUserByEmail(userDetails.email);
//             console.log('user--->',user);
//             if (!user) {
//                 const error = new Error('email not found');
//                 res.status(500).json({
//                     error,
//                 });
//                 bcrypt.compare(password, user.password);
//             }
//             else(!hashedPassword)
//              {
//                 const error = new Error('Wrong password');
//                 res.status(500).json({
//                     error,
//             }
//                 )}
//         const key ='abcdefg';
//         const token =jwt.sign({
//             email :user.email,
//         }),
//         key
//         // { expiresIn:'1h' }
//         res.status(200).json({ token : token, email: user.email});
//     }
//         } catch (error) {
//             if (error.name === 'UserNotFoundError') {
//                 try {
//                     const savedUser = await userModel.getUserByEmail({
//                         email: userDetails.email,
//                         password: userDetails.password,
//                     });
//                     // eslint-disable-next-line no-console
//                     res.status(201).json(savedUser);
//                 } catch (saveErr) {
//                     throw saveErr;
//                 }
//             } else {
//                 res.status(500).json({
//                     message: 'Something went wrong',
//                 });
//             }
//         }
//     }
// };
