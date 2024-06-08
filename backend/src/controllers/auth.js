const User = require('../models/user');
const { encryptPassword, verifyPassword } = require('../lib/encrypt');
const { validateUser } = require('../schemas/user');
const jwt = require('../lib/jwt');
const createError = require('http-errors');

async function signup(req, res) {
	const userFields = validateUser(req.body);

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
	try {
		const user = await userSchema.save();
		const accessToken = jwt.generateToken(user);
		const refreshToken = jwt.generateRefreshToken(user);

		return res.status(201).json({
			user,
			accessToken,
			refreshToken,
		});
	} catch (error) {
		if (error.code === 11000) {
			// Código de error de duplicación
			const duplicateField = Object.keys(error.keyPattern)[0]; // Obtener el campo duplicado
			let errorMessage = '';
			const errorStatus = 409;

			if (duplicateField === 'username') {
				errorMessage = 'Username already in use.';
			} else if (duplicateField === 'email') {
				errorMessage = 'Email already in use.';
			} else {
				errorMessage = 'Duplicate field error.';
			}

			res.status(errorStatus);

			res.json({
				succes: false,
				error: errorMessage,
			});
		} else {
			res.status(error.status || 500);

			res.json({
				succes: false,
				error: error.message,
			});
		}
	}
}

async function login(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		throw createError(400, 'Username/Email and password are required');
	}

	const loginField = username.includes('@')
		? { email: username.toLowerCase() }
		: { username: username.toLowerCase() };

	try {
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

		res.status(200).json({
			message: 'Login successful',
			accessToken,
			refreshToken,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
}

module.exports = {
	signup,
	login,
};
