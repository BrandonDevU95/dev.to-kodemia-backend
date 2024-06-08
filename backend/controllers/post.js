const Post = require('../models/post');
const { validatePost, validatePostPartial } = require('../schemas/post');
const createError = require('http-errors');

const createPost = async (req, res) => {
	const { user_id } = req.user;
	const postFields = validatePost(req.body);

	if (!postFields.success) {
		throw createError(400, JSON.parse(postFields.error.message));
	}

	const tempPost = {
		...postFields.data,
		author: user_id,
	};

	const post = new Post(tempPost);

	try {
		await post.save();
		res.status(201).json({ message: 'Post created successfully!' });
	} catch (error) {
		throw createError(400, error.message);
	}
};

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ created_at: -1 });

		if (!posts) {
			throw createError(404, 'No posts found');
		}

		res.status(200).json(posts);
	} catch (error) {
		throw createError(400, error.message);
	}
};

const getPostById = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);

		if (!post) {
			throw createError(404, 'Post not found');
		}

		res.status(200).json(post);
	} catch (error) {
		throw createError(400, error.message);
	}
};

const updatePost = async (req, res) => {
	const { id } = req.params;
	const postFields = req.body;

	if (!id) {
		throw createError(400, 'Post ID is required');
	}

	postFields.updated_at = new Date(postFields.updated_at);
	delete postFields.author;

	const postData = validatePostPartial(postFields);

	if (!postData.success) {
		throw createError(400, JSON.parse(postData.error.message));
	}

	try {
		const post = await Post.findByIdAndUpdate({ _id: id }, postData.data, {
			new: true,
		});

		if (!post) {
			throw createError(404, 'Post not found');
		}

		res.status(200).json({ message: 'Post updated successfully!' });
	} catch (error) {
		throw createError(400, error.message);
	}
};

const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		throw createError(400, 'Post ID is required');
	}

	try {
		const post = await Post.findByIdAndDelete({ _id: id });

		if (!post) {
			throw createError(404, 'Post not found');
		}

		res.status(200).json({ message: 'Post deleted successfully!' });
	} catch (error) {
		throw createError(400, error.message);
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
};
