const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const privateKey = '12345';
const saltRounds = 10;

exports.generateHash = function (input) {
    return new Promise(((resolve, reject) => {
        bcrypt.hash(input, saltRounds, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(hash);
            }
        });
    }));
};

exports.compareHash = function (input, hash) {
    return new Promise(((resolve, reject) => {
        bcrypt.compare(input, hash, (err, res) => {
            // console.log('token---->', token);
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    }));
};

exports.generateToken = function (payload) {
    return new Promise(((resolve, reject) => {
        jwt.sign(payload, privateKey, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    }));
};
