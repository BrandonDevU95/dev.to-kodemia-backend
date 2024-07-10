const express = require('express');
const userUsecase = require('../usecases/user.usecase');
const { userAuth } = require('../middlewares/auth.middleware');

const api = express.Router();

api.get('/user/avatars', async (req, res) => {
	try {
		const avatars = await userUsecase.getAllAvatars();

		res.status(200).json({
			success: true,
			message: 'Avatars retrieved successfully',
			data: avatars,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

api.get('/user/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw createError(400, 'User ID is required');
		}

		const user = await userUsecase.getUserById(id);

		res.status(200).json({
			success: true,
			message: 'User retrieved successfully',
			data: user,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

api.get('/user/username/:username', async (req, res) => {
	try {
		const { username } = req.params;

		if (!username) {
			throw createError(400, 'Username is required');
		}

		const user = await userUsecase.getUserByUsername(username);

		res.status(200).json({
			success: true,
			message: 'User retrieved successfully',
			data: user,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

api.patch('/user', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;
		const { body } = req;

		if (!body) {
			throw createError(400, 'Body is required');
		}

		const user = await userUsecase.updateUser(user_id, body);

		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: user,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

module.exports = api;
