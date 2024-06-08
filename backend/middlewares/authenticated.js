const jwt = require('../utils/jwt');
const createError = require('http-errors');

function userAuth(req, res, next) {
	//Recibe los token por headers
	const accessToken = req.headers['authorization'];
	const refreshToken = req.headers['refresh-token'];

	if (!accessToken && !refreshToken) {
		throw createError(401, 'Unauthorized: No token provided');
	}

	try {
		let accessTokenPayload;
		let refreshTokenPayload;

		// Verificamos el access token
		if (accessToken) {
			accessTokenPayload = jwt.decodedToken(accessToken);
		}

		// Verificamos el refresh token
		if (refreshToken) {
			refreshTokenPayload = jwt.decodedToken(refreshToken);
		}

		const currentTime = Date.now();

		// Evaluamos si el access token ha expirado
		if (!accessTokenPayload || accessTokenPayload.exp <= currentTime) {
			// Si el refresh token ha expirado
			if (
				!refreshTokenPayload ||
				refreshTokenPayload.exp <= currentTime
			) {
				throw createError(
					401,
					'Token has expired. Please log in again.'
				);
			} else {
				// Generamos un nuevo access token
				const newAccessToken = jwt.generateToken({
					_id: refreshTokenPayload.user_id,
				});
				// Asignamos el payload del nuevo access token a req.user
				req.user = jwt.decodedToken(newAccessToken);
				return next();
			}
		}

		// Si el access token es válido, asignamos el payload a req.user
		req.user = accessTokenPayload;
		next();
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
}

module.exports = { userAuth };
