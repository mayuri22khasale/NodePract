const db = require('../db');

const userRef = db.collection('users');

exports.createuser = function (userDetails) {
    return new Promise((async (resolve, reject) => {
        const docRef = userRef.doc();
        try {
            await docRef.set(userDetails);
            resolve({ email: userDetails.email });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};

exports.getUserByEmail = function (email) {
    return new Promise((async (resolve, reject) => {
        try {
            const query = userRef.where('email', '==', email);
            const userSnapShot = await query.get();
            if (userSnapShot.empty) {
                const userNotFoundError = new Error('User not found');
                userNotFoundError.name = 'UserNotFoundError';
                reject(userNotFoundError);
            } else {
                userSnapShot.forEach((doc) => {
                    resolve(doc.data());
                });
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};
// TODO: Write a function getUser having input as object with keys same as db fields
