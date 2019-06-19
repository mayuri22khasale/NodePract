const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

// const todolistmodel = require('../controllers/todolist');

router.post('/users/signup', userController.registeruser);

// router.get('/todolist/get/date', userController.getTodolist);

router.post('/users/login', userController.login);
// router.post('/todolist/create', userController.createTodolist);
// router.put('/todolist/update');

// router.delete('/todolist/delete');

module.exports = router;
