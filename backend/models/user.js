const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		firstname: String,
		lastname: String,
	},
	email: String,
	phone: String,
	username: String,
	avatar: String,
	password: String,
	about: String,
	address: {
		city: String,
		number: Number,
		street: String,
		zipcode: Number,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
