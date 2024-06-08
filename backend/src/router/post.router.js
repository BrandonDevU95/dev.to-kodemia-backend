const express = require('express');
const postUsecase = require('../usecases/post.usecase');
const { userAuth } = require('../middlewares/auth.middleware');
const createError = require('http-errors');

const api = express.Router();

api.post('/posts', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;
		const postData = req.body;

		if (!postData) {
			throw createError(400, 'Post data is required');
		}

		const savedPost = await postUsecase.createPost(user_id, postData);

		res.status(201).json({
			success: true,
			message: 'Post created successfully',
			data: savedPost,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.get('/posts', async (req, res) => {
	try {
		const posts = await postUsecase.getAllPosts();

		res.status(200).json({
			success: true,
			message: 'All posts retrieved successfully',
			data: posts,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.get('/posts/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw createError(400, 'Post ID is required');
		}

		const post = await postUsecase.getPostById(id);

		res.status(200).json({
			success: true,
			message: 'Post retrieved successfully',
			data: post,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.patch('/posts/:id', userAuth, async (req, res) => {
	try {
		const { id } = req.params;
		const postFields = req.body;

		if (!id) {
			throw createError(400, 'Post ID is required');
		}

		const post = await postUsecase.updatePost(id, postFields);

		res.status(200).json({
			success: true,
			message: 'Post updated successfully',
			data: post,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.delete('/posts/:id', userAuth, async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw createError(400, 'Post ID is required');
		}

		const post = await postUsecase.deletePost(id);

		res.status(200).json({
			success: true,
			message: 'Post deleted successfully',
			data: post,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

module.exports = api;
