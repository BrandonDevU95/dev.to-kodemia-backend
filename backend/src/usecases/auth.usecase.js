const User = require('../models/user.model');
const { encryptPassword, verifyPassword } = require('../lib/encrypt');
const { validateUser } = require('../schemas/user.schema');
const jwt = require('../lib/jwt');
const createError = require('http-errors');

async function signup(userData) {
	const userFields = validateUser(userData);

	if (!userFields.success) {
		throw createError(400, JSON.parse(userFields.error.message));
	}

	const hashedPassword = await encryptPassword(userFields.data.password);

	if (hashedPassword.error) {
		throw createError(500, hashedPassword.message);
	}

	const tempUser = {
		...userFields.data,
		email: userFields.data.email.toLowerCase(),
		password: hashedPassword,
	};

	const userSchema = new User(tempUser);
	const user = await userSchema.save();
	const accessToken = jwt.generateToken(user);
	const refreshToken = jwt.generateRefreshToken(user);

	return {
		user,
		accessToken,
		refreshToken,
	};
}

async function login(username, password) {
	if (!username || !password) {
		throw createError(400, 'Username/Email and password are required');
	}

	const loginField = username.includes('@')
		? { email: username.toLowerCase() }
		: { username: username.toLowerCase() };

	const user = await User.findOne(loginField);

	if (!user) {
		throw createError(400, 'Invalid credentials');
	}

	const isValidPassword = await verifyPassword(password, user.password);

	if (!isValidPassword) {
		throw createError(400, 'Invalid credentials');
	}

	const accessToken = jwt.generateToken(user);
	const refreshToken = jwt.generateRefreshToken(user);

	return {
		accessToken,
		refreshToken,
	};
}

module.exports = {
	signup,
	login,
};
