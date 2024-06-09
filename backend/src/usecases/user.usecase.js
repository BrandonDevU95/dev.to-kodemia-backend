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

module.exports = { getUserById };
