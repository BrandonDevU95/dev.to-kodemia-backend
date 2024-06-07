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

module.exports = { createPost };
