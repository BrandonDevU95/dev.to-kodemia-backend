const express = require('express');
const UserController = require('../usecases/user.usecase');

const api = express.Router();

api.get('/user/:id', UserController.getUserById);

module.exports = api;
