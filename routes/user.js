const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/users/signup', userController.registeruser);

module.exports = router;
