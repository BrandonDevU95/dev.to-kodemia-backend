const User = require('../models/user');

//Para obtener la información de un usuario por id
const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		delete user._doc.password;
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = { getUserById };
