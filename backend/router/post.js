const express = require('express');
const PostController = require('../controllers/post');
const { userAuth } = require('../middlewares/authenticated');

const api = express.Router();

api.post('/posts', userAuth, PostController.createPost);

module.exports = api;
