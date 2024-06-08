const bcrypt = require('bcrypt');

const saltRounds = 10; // Número de rondas de sal para el algoritmo bcrypt

const encryptPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
};

const verifyPassword = async (password, hashedPassword) => {
	try {
		const match = await bcrypt.compare(password, hashedPassword);
		return match;
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
};

module.exports = { encryptPassword, verifyPassword };
