const User = require('../models/user.model');
const createError = require('http-errors');

async function getUserById(id) {
	const user = await User.findById(id);

	if (!user) {
		throw createError(404, 'User not found');
	}

	delete user._doc.password;
	return user;
}

async function getUserByUsername(username) {
	const user = await User.findOne({
		username: username,
	});

	if (!user) {
		throw createError(404, 'User not found');
	}

	delete user._doc.password;

	return user;
}

async function getAllAvatars() {
	const users = await User.find();

	const avatars = users.map((user) => {
		return {
			username: user.username,
			imagen: user.avatar,
		};
	});
	return avatars;
}

module.exports = { getUserById, getUserByUsername, getAllAvatars };
