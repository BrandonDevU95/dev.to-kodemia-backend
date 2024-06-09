const Post = require('../models/post.model');
const { validatePost, validatePostPartial } = require('../schemas/post.schema');
const createError = require('http-errors');

async function createPost(user_id, postData) {
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
}

async function getAllPosts() {
	const posts = await Post.find().sort({ created_at: -1 });

	if (!posts) {
		throw createError(404, 'No posts found');
	}

	return posts;
}

async function getPostById(id) {
	const post = await Post.findById(id);

	if (!post) {
		throw createError(404, 'Post not found');
	}

	return post;
}

async function updatePost(id, postData) {
	postData.updated_at = new Date(postData.updated_at);
	delete postData.author;

	const postValidated = validatePostPartial(postData);

	if (!postValidated.success) {
		throw createError(400, JSON.parse(postValidated.error.message));
	}

	const post = await Post.findByIdAndUpdate({ _id: id }, postValidated.data, {
		new: true,
	});

	if (!post) {
		throw createError(404, 'Post not found');
	}

	return post;
}

async function deletePost(id) {
	const post = await Post.findByIdAndDelete({ _id: id });

	if (!post) {
		throw createError(404, 'Post not found');
	}

	return post;
}

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
};
