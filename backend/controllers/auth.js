const User = require('../models/user');
const { encryptPassword, verifyPassword } = require('../utils/authPass');
const { validateUser } = require('../schemas/user');
const jwt = require('../utils/jwt');

async function signup(req, res) {
	const userFields = validateUser(req.body);

	if (!userFields.success) {
		return res
			.status(400)
			.json({ error: JSON.parse(userFields.error.message) });
	}

	const hashedPassword = await encryptPassword(userFields.data.password);

	if (hashedPassword.error) {
		return res.status(500).json({ error: hashedPassword.message });
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

			if (duplicateField === 'username') {
				errorMessage = 'Username already in use.';
			} else if (duplicateField === 'email') {
				errorMessage = 'Email already in use.';
			} else {
				errorMessage = 'Duplicate field error.';
			}

			res.status(400).json({ error: errorMessage });
		} else {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

async function login(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ error: 'Username/Email and password are required' });
	}

	const loginField = username.includes('@')
		? { email: username.toLowerCase() }
		: { username: username.toLowerCase() };

	try {
		const user = await User.findOne(loginField);

		if (!user) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		const isValidPassword = await verifyPassword(password, user.password);

		if (!isValidPassword) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		const accessToken = jwt.generateToken(user);
		const refreshToken = jwt.generateRefreshToken(user);

		res.status(200).json({
			message: 'Login successful',
			accessToken,
			refreshToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
module.exports = {
	signup,
	login,
};
