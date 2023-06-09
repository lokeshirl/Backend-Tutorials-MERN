const express = require('express');
const usersController = require('../controller/users');

const router = express.Router();

router
  .post('/', usersController.createUser)
  .get('/', usersController.getAllUsers)
  .get('/:id', usersController.getUser)
  .put('/:id', usersController.replaceUser)
  .patch('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser);

exports.router = router;
