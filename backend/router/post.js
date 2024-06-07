const express = require('express');
const PostController = require('../controllers/post');
const { userAuth } = require('../middlewares/authenticated');

const api = express.Router();

api.post('/posts', userAuth, PostController.createPost);
api.get('/posts', PostController.getAllPosts);

module.exports = api;
