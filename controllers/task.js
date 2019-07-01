const Joi = require('@hapi/joi');
const taskModel = require('../models/task');
const taskValidator = require('../validations/task');
const db = require('../db');

const taskRef = db.collection('tasks');

exports.createTask = async (req, res) => {
    const validationResult = Joi.validate(req.body, taskValidator.taskSchema);
    if (validationResult.error) {
        res.status(400).json({ message: validationResult.error.details[0].message });
    } else {
        const taskDetails = validationResult.value;
        taskDetails.userId = req.userId;
        try {
            const task = await taskModel.create(taskDetails);
            res.status(201).json({
                message: 'Task created',
                data: task,
            });
        } catch (error) {
            throw (error);
        }
    }
};

exports.deleteTask = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    try {
        const taskDetails = await taskModel.getTaskById(taskId);
        const taskDelete = await taskModel.delete(taskId);
        res.json(taskDetails);
    } catch (error) {
        if (error.name === 'TaskNotFoundError') {
            res.status(400).json(error);
        } else {
            throw error;
        }
    }
};

exports.updateTask = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const validationResult = Joi.validate(req.body, taskValidator.taskSchema);
    if (validationResult.error) {
        res.status(400).json({ message: validationResult.error.details[0].message });
    } else {
        const taskDetails = validationResult.value;
        taskDetails.userId = req.userId;
        try {
            const task = await taskModel.update(taskId, taskDetails);
            res.status(201).json({
                message: 'Task updated',
                data: task,
            });
        } catch (error) {
            throw (error);
        }
    }
};

exports.getTodolist = async (req, res) => {
    const date = req.params.date;
    const task = req.params.task;
    const page =req.params.page;
    const pageSze = req.params.pageSze;
try {
    const taskDetails = await taskModel.getTask();
   console.log('taskDetails-->',taskDetails);
   let allCities = await taskDetails
              .then(snapshot => {
                snapshot.forEach(doc => {
                    const taskD =(doc.id, '=>', doc.data());
                  console.log('taskD-------->',taskD);
                resolve(taskD);
                });
              })
    // if (task) {
    //     const error = new Error('tasssssk not ound');
    //     error.statusCode = 400;
    //     throw error;
    // } else {
    //     const query = taskRef.where('task', '==', task);
    //     const userSnapShot = query.get();
    //     console.log('usersnapshopt----->', userSnapShot);
    //     if (userSnapShot.empty) {
    //         const taskNotFoundError = new Error('task not found');
    //         taskNotFoundError.name = 'TaskNotFoundError';
    //         res.status(409).json({
    //             message: 'Task nooooot found',
    //         });
    //     } else {
    //         userSnapShot.forEach((doc,count) => {
    //             const page = req.query.page || 1;
    //             const viewPage = 2;
    //             const pageCount=count;
    //             if(pageCount<1){
    //                 skip((page-1) *viewPage);
    //                 limit(viewPage);
    //             }
                res.status(200).json({
                    message: 'Task found',taskDetails 
                });
    //         });
    //     }
    // }
    
} catch (error) {
    throw (error);

}
    
};

exports.paginateQuery = async (req, res) => {
    const userId = req.userId;
    const date = req.params.date;
    try {
        // const taskDetails = await taskModel.getTaskById(taskId);
        const taskPagination = await taskModel.paginateQuery(date);
        res.json({"message":"get task by pagination"},
            taskPagination);
    } catch (error) {
        if (error.name === 'TaskNotFoundError') {
            res.status(400).json(error);
        } else {
            throw error;
        }
    }
};

