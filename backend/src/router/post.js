const express = require('express');
const PostController = require('../controllers/post');
const { userAuth } = require('../middlewares/authenticated');

const api = express.Router();

api.post('/posts', userAuth, PostController.createPost);
api.get('/posts', PostController.getAllPosts);
api.get('/posts/:id', PostController.getPostById);
api.patch('/posts/:id', userAuth, PostController.updatePost);
api.delete('/posts/:id', userAuth, PostController.deletePost);

module.exports = api;
