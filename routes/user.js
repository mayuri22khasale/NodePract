const express = require('express');

const router = express.Router();

const middleware = require('../middlewares');
const userController = require('../controllers/user');
const taskController = require('../controllers/task');

// const todolistmodel = require('../controllers/todolist');

router.post('/users/signup', userController.registeruser);

router.post('/users/login', userController.login);

router.get('/users/hello', middleware.ensureAuthorizedUser, userController.getSomething);
// router.post('/users/createList', userController.createList);
// router.post('/todolist/create', userController.createTodolist);
// router.put('/todolist/update');
// router.delete('/todolist/delete');

router.delete('/users/:userId/tasks/:taskId', middleware.ensureAuthorizedUser, taskController.deleteTask);

router.put('/users/:userId/tasks/:taskId', middleware.ensureAuthorizedUser, taskController.updateTask);

router.get('/users/getTask/:date', taskController.paginateQuery);

router.get('/users/getTodoList', taskController.getTodolist);

module.exports = router;

