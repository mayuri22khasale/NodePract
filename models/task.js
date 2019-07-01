const db = require('../db');

const taskRef = db.collection('tasks');

exports.create = function (taskDetails) {
    return new Promise((async (resolve, reject) => {
        const docRef = taskRef.doc();
        // const docRef = taskRef.doc();
        // console.log('docRef-->', docRef);
        try {
            await docRef.set(taskDetails);
            resolve({
                name: taskDetails.name,
                date: taskDetails.date,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};

exports.delete = function (taskId) {
    return new Promise((async (resolve, reject) => {
        const docRef = taskRef.doc(taskId);
        try {
            await taskRef.doc(taskId).delete();
            resolve({
                docRef,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};

exports.getTaskById = function (taskId) {
    return new Promise((async (resolve, reject) => {
        try {
            const docRef = taskRef.doc(taskId);
            const doc = await docRef.get();
            if (doc.exists) {
                const taskDetails = doc.data();
                resolve(taskDetails);
            } else {
                const taskNotFoundErr = new Error('task not available');
                taskNotFoundErr.name = 'TaskNotFoundError';
                reject(taskNotFoundErr);
            }
        } catch (error) {
            reject(error);
        }
    }));
};

exports.update = function (taskId, taskDetails) {
    return new Promise((async (resolve, reject) => {
        const docRef = taskRef.doc();
        // const docRef = taskRef.doc();
        // console.log('docRef-->', docRef);
        try {
            // await taskRef.doc(taskId).delete();
            // await docRef.update(taskDetails);
            await taskRef.doc(taskId).update({
                name: taskDetails.name,
                date: taskDetails.date,
                status: taskDetails.status,
            });
            // const updatefield = await docRef.update({
            //     name: taskDetails.name,
            //     date: taskDetails.date,
            // });
            resolve({
                name: taskDetails.name,
                date: taskDetails.date,
                status: taskDetails.status,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};

exports.paginateQuery = function (date) {
    return new Promise((async (resolve, reject) => {
        const docRef = taskRef.doc();
        const docRef = taskRef.doc();
        console.log('docRef-->', docRef);
        try {
            await taskRef.doc(taskId).delete();
            await docRef.update(taskDetails);
                        const lastVisible = documentSnapshots.getDocuments()
                            .get(documentSnapshots.size() - 1);
                        const next = await taskRef
                            .orderBy('date')
                            .startAfter(lastVisible)
                            .limit(5);
                        const taskData = await taskRef.doc('date').get();
            const updatefield = await docRef.update({
                name: taskDetails.name,
                date: taskDetails.date,
            });
            resolve({
                taskData,
                message: 'get data',
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }));
};

exports.getTaskById = function (taskId) {
    return new Promise((async (resolve, reject) => {
        try {
            const docRef = taskRef.doc(taskId);
            const doc = await docRef.get();
            if (doc.exists) {
                const taskDetails = doc.data();
                resolve(taskDetails);
            } else {
                const taskNotFoundErr = new Error('task not available');
                taskNotFoundErr.name = 'TaskNotFoundError';
                reject(taskNotFoundErr);
            }
        } catch (error) {
            reject(error);
        }
    }));
};

exports.getTask = function () {
    var pageSize = Number(req.query.pageSize);
    var pageNumber = Number(req.query.page);
    var startValue = (pageNumber - 1) * pageSize;
    var endValue = pageSize;
    var dbRef = req.dbRef;
    var getTaskRef = citiesRef = db.collection('tasks');
    var getTaskDetails = getTaskRef.limit(endValue).offset(startValue).orderBy('date').get().then(taskquerysnap =>{
        if(taskquerysnap.empty){
            console.log('task not found');
            res.status(500).send({message:'task not found'});
        } else {
            var taskList = taskquerysnap.docs.map(doc => {
                var tasksL = doc.data();
                console.log(tasksL);
        });
        res.status(200).send({ message: 'Success', tasksL: tasksL });
    }
    }).catch(err => {
        console.log('Err in chefs query', err);
        res.status(502).send({ message: 'error ' });
    });
    
//     return new Promise((async (resolve, reject) => {
//         try {
//             // const docRef = await taskRef.
//             // const doc = await docRef.get();
//             let citiesRef = db.collection('tasks');
//             let allCities = await citiesRef.get()
//               .then(snapshot => {
//                 snapshot.forEach(doc => {
//                     const taskD =(doc.id, '=>', doc.data());
//                   console.log('taskD-------->',taskD);
//                 resolve(taskD);
//                 });
//               })
//               .catch(err => {
//                 console.log('Error getting documents', err);
//               });
//         console.log('taskD---->',taskD);
// //   .catch(err => {
// //     console.log('Error getting documents', err);
// //   });
// //             if (!doc.exists) {
// //                 const taskDetails = doc.data();
// //                 resolve(taskDetails);
// //             } else {
// //                 const taskNotFoundErr = new Error('task not available');
// //                 taskNotFoundErr.name = 'TaskNotFoundError';
// //                 reject(taskNotFoundErr);
// //             }
//         } catch (error) {
//             reject(error);
//         }
//     }));
};
