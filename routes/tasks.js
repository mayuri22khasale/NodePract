const express = require('express');

const router = express.Router();

const middleware = require('../middlewares');

const taskController = require('../controllers/task');

router.post('/users/:userId/create', middleware.ensureAuthorizedUser, taskController.createTask);

router.delete('/users/:userId/tasks/:taskId', middleware.ensureAuthorizedUser, taskController.deleteTask);

router.put('/users/:userId/tasks/:taskId', middleware.ensureAuthorizedUser, taskController.updateTask);

router.get('/users/getTask', middleware.ensureAuthorizedUser, taskController.paginateQuery);
