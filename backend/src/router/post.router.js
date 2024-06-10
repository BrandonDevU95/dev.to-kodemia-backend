const express = require('express');
const postUsecase = require('../usecases/post.usecase');
const { userAuth } = require('../middlewares/auth.middleware');
const createError = require('http-errors');

const api = express.Router();

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
api.get('/posts/tags', async (req, res) => {
	try {
		const tags = await postUsecase.getAllTags();

		res.status(200).json({
			success: true,
			message: 'All tags retrieved successfully',
			data: tags,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.get('/posts/categories', async (req, res) => {
	try {
		const categories = await postUsecase.getAllCategories();

		res.status(200).json({
			success: true,
			message: 'All categories retrieved successfully',
			data: categories,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.get('/posts/relevant', async (req, res) => {
	try {
		const posts = await postUsecase.getPostsByRelevant();

		res.status(200).json({
			success: true,
			message: 'Relevant posts retrieved successfully',
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
api.get('/posts/author/:author', async (req, res) => {
	try {
		const { author } = req.params;

		if (!author) {
			throw createError(400, 'Author is required');
		}

		const posts = await postUsecase.getPostsByAuthor(author);

		res.status(200).json({
			success: true,
			message: 'Posts by author retrieved successfully',
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
api.get('/posts/tag/:tag', async (req, res) => {
	try {
		const { tag } = req.params;

		if (!tag) {
			throw createError(400, 'Tag is required');
		}

		const posts = await postUsecase.getPostsByTag(tag);

		res.status(200).json({
			success: true,
			message: 'Posts by tag retrieved successfully',
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
api.get('/posts/last-posts/:limit', async (req, res) => {
	try {
		const { limit } = req.params;

		if (!limit) {
			throw createError(400, 'Limit is required');
		}

		const posts = await postUsecase.getLastPosts(limit);

		res.status(200).json({
			success: true,
			message: 'Last posts retrieved successfully',
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
api.get('/posts/top-reactions/:limit', async (req, res) => {
	try {
		const { limit } = req.params;

		if (!limit) {
			throw createError(400, 'Limit is required');
		}

		const posts = await postUsecase.getPostsMoreReactions(limit);

		res.status(200).json({
			success: true,
			message: 'Posts with more reactions retrieved successfully',
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
api.get('/posts/category/:category', async (req, res) => {
	try {
		const { category } = req.params;

		if (!category) {
			throw createError(400, 'Category is required');
		}

		const posts = await postUsecase.getPostsByCategory(category);

		res.status(200).json({
			success: true,
			message: 'Posts by category retrieved successfully',
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
api.get('/posts/verify-post/:id', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;
		const { id } = req.params;

		if (!id) {
			throw createError(400, 'Post ID is required');
		}

		const post = await postUsecase.verifyPostUser(user_id, id);

		res.status(200).json({
			success: true,
			message: 'Post verified successfully',
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
