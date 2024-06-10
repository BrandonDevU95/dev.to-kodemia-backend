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
async function getPostById(id) {
	const post = await Post.findById(id);

	if (!post) {
		throw createError(404, 'Post not found');
	}

	return post;
}
async function getAllPosts() {
	const posts = await Post.find().sort({ created_at: -1 });

	if (!posts) {
		throw createError(404, 'No posts found');
	}

	return posts;
}
async function getAllTags() {
	const posts = await Post.find().sort({ created_at: -1 });
	const tags = posts.map((post) => post.tags).flat();
	const uniqueTags = [...new Set(tags)];
	return uniqueTags;
}
async function getLastPosts(numPost) {
	const posts = await Post.find().sort({ created_at: -1 }).limit(numPost);
	return posts;
}
async function getAllCategories() {
	const posts = await Post.find().sort({ created_at: -1 });
	const categories = posts.map((post) => post.category);
	const uniqueCategories = [...new Set(categories)];
	return uniqueCategories;
}
async function getPostsMoreReactions(numPost) {
	const posts = await Post.find().sort({ numReactions: -1 }).limit(numPost);
	return posts;
}
async function getPostsByRelevant() {
	const posts = await Post.find({ relevant: true });
	return posts;
}
async function getPostsByCategory(category) {
	const posts = await Post.find({ category: category });
	return posts;
}
async function getPostsByAuthor(user_id) {
	const posts = await Post.find({ author: user_id });
	return posts;
}
async function getPostsByTag(tag) {
	const posts = await Post.find({ tags: tag });
	return posts;
}
async function verifyPostUser(user_id, post_id) {
	const post = await Post.findById(post_id);
	if (post.author != user_id) {
		return false;
	} else {
		return true;
	}
}

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
	getAllTags,
	getLastPosts,
	getAllCategories,
	getPostsMoreReactions,
	getPostsByRelevant,
	getPostsByCategory,
	getPostsByAuthor,
	getPostsByTag,
	verifyPostUser,
};
