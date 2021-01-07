const express = require('express');
const  usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.json({hello : "hello"});
});

module.exports = usersRouter;
