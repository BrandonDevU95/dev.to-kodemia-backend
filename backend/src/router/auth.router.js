const express = require('express');
const AuthController = require('../usecases/auth.usecase');

const api = express.Router();

api.post('/signup', AuthController.signup);
api.post('/login', AuthController.login);

module.exports = api;
