const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	category: String,
	description: String,
	created_at: {
		type: Date,
		default: Date.now,
	},
	image: String,
	numComments: {
		type: Number,
		default: 0,
	},
	numReactions: {
		type: Number,
		default: 0,
	},
	relevant: {
		type: Boolean,
		default: false,
	},
	tags: [String],
	readingTime: String,
	title: String,
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Post', postSchema);
