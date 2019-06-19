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

exports.createTodolist = function (todoDetails) {
    return new Promise((async (resolve, reject) => {
        const docRef = userRef.doc();
        try {
            await docRef.set(todoDetails);
            resolve({ task: todoDetails.task, date: todoDetails.date });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};


// exports.getTodolist = (req, res, next) => {
//     res.status(200).json({
//         Todolist: [{ task: 'Write APi', date: '2 june 2019' }],
//     });
// };

exports.getTodolist = function (task) {
    return new Promise((async (resolve, reject) => {
        try {
            const query = userRef.where('task', '==', task);
            const userSnapShot = await query.get();
            if (userSnapShot.empty) {
                const taskNotFoundError = new Error('task not found');
                taskNotFoundError.name = 'TaskNotFoundError';
                reject(taskNotFoundError);
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

// exports.updateTodolist = function (task) {
//     return new Promise((async(resolve ,reject)) => {
//         try {
//             const query = userRef.where('task', '==', task);
//             const userSnapShot = await query.get();
//             if (userSnapShot.empty) {
//               const error = new Error('Task_not_found');
//               error.name = 'Task not found';
//               reject(Task_not_found);
//             }
//             else {
//                 userSnapShot = await query.get();

//             }
//         }
//     };
//     )};
