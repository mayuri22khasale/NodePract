const db = require('../db');

const userRef = db.collection('users');

exports.getTodolist = (req, res, next) => {
    res.status(200).json({
        Todolist: [{ task: 'Write APi', date: '2 june 2019' }],
    });
};

// exports.createTodolist = (req, res, next) => {
//     const task = req.body.task;
//     const date = req.body.date;

//     res.status(201).json({
//         message: 'task Created',
//         Todolist: { id: new Date().toISOString(), task, date },
//     });
// };


// exports.createTodolist = function (todoDetails) {
//     return new Promise((async (resolve, reject) => {
//         const docRef = userRef.doc();
//         try {
//             await docRef.set(todoDetails);
//             resolve({ task: todoDetails.task, date: todoDetails.date });
//         } catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     }));
// };
