const Post = require('../models/post');
const { validatePost } = require('../schemas/post');

const createPost = async (req, res) => {
	const { user_id } = req.user;
	const postFields = validatePost(req.body);

	if (!postFields.success) {
		return res
			.status(400)
			.json({ error: JSON.parse(postFields.error.message) });
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
		res.status(400).json({ error: error.message });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ created_at: -1 });

		if (!posts) {
			return res.status(404).json({ error: 'No posts found' });
		}

		res.status(200).json(posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { createPost, getAllPosts };
