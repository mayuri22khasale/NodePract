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
        // const docRef = taskRef.doc();
        // console.log('docRef-->', docRef);
        try {
            // await taskRef.doc(taskId).delete();
            // await docRef.update(taskDetails);
                        // const lastVisible = documentSnapshots.getDocuments()
                        //     .get(documentSnapshots.size() - 1);
                        // const next = await taskRef
                        //     .orderBy('date')
                        //     .startAfter(lastVisible)
                        //     .limit(5);
                        const taskData = await taskRef.doc('date').get();
            // const updatefield = await docRef.update({
            //     name: taskDetails.name,
            //     date: taskDetails.date,
            // });
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
