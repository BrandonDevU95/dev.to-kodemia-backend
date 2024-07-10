const User = require('../models/user.model');
const createError = require('http-errors');
const { validateUserPartial } = require('../schemas/user.schema');

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

async function updateUser(id, user) {
	user.updated_at = new Date(user.updated_at);

	const userValidated = validateUserPartial(user);

	if (!userValidated.success) {
		throw createError(400, JSON.parse(userValidated.error.message));
	}

	const userUpdated = await User.findByIdAndUpdate(
		{ _id: id },
		userValidated.data,
		{
			new: true,
		}
	);

	if (!userUpdated) {
		throw createError(404, 'User not found');
	}

	return userUpdated;
}

module.exports = { getUserById, getUserByUsername, getAllAvatars, updateUser };
