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


exports.paginateQuery = async (req, res) => {
    const userId = req.userId;
    const date = req.params.date;
    try {
        // const taskDetails = await taskModel.getTaskById(taskId);
        const taskPagination = await taskModel.paginateQuery(date);
        res.json(taskPagination);
    } catch (error) {
        if (error.name === 'TaskNotFoundError') {
            res.status(400).json(error);
        } else {
            throw error;
        }
    }
};
