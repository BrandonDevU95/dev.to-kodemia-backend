const User = require('../models/user');
const createError = require('http-errors');

//Para obtener la información de un usuario por id
const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);

		if (!user) {
			throw createError(404, 'User not found');
		}

		delete user._doc.password;
		res.status(200).json(user);
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
};

module.exports = { getUserById };
