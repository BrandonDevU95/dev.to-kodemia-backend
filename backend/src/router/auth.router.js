const express = require('express');
const authUsecase = require('../usecases/auth.usecase');

const api = express.Router();

api.post('/signup', async (req, res) => {
	try {
		const user = await authUsecase.signup(req.body);
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: user,
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
});

api.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const { accessToken, refreshToken } = await authUsecase.login(
			username,
			password
		);

		res.status(200).json({
			success: true,
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
});

module.exports = api;
