const express = require('express');
const  usersRouter = express.Router();
const userController = require('../controllers/user.controller');

usersRouter.post('/register', userController.register);
usersRouter.post('/login', userController.login);

module.exports = usersRouter;
