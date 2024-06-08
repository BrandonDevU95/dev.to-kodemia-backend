const Post = require('../models/post.model');
const { validatePost, validatePostPartial } = require('../schemas/post.schema');
const createError = require('http-errors');

const createPost = async (user_id, postData) => {
	const postValidate = validatePost(postData);

	if (!postValidate.success) {
		throw createError(400, JSON.parse(postValidate.error.message));
	}

	const post = new Post({
		...postValidate.data,
		author: user_id,
	});

	if (!post) {
		throw createError(500, 'Error creating post');
	}

	const savedPost = await post.save();
	return savedPost;
};

const getAllPosts = async () => {
	const posts = await Post.find().sort({ created_at: -1 });

	if (!posts) {
		throw createError(404, 'No posts found');
	}

	res.status(200).json(posts);
};

const getPostById = async (id) => {
	const post = await Post.findById(id);

	if (!post) {
		throw createError(404, 'Post not found');
	}

	res.status(200).json(post);
};

const updatePost = async (id, postData) => {
	postFields.updated_at = new Date(postFields.updated_at);
	delete postFields.author;

	const postData = validatePostPartial(postFields);

	if (!postData.success) {
		throw createError(400, JSON.parse(postData.error.message));
	}

	const post = await Post.findByIdAndUpdate({ _id: id }, postData.data, {
		new: true,
	});

	if (!post) {
		throw createError(404, 'Post not found');
	}

	return post;
};

const deletePost = async (id) => {
	const post = await Post.findByIdAndDelete({ _id: id });

	if (!post) {
		throw createError(404, 'Post not found');
	}

	return post;
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
};
