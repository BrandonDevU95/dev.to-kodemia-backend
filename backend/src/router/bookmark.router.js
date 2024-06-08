const express = require('express');
const bookmarkUsecase = require('../usecases/bookmark.usecase');
const { userAuth } = require('../middlewares/auth.middleware');

const api = express.Router();

api.post('/bookmarks', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;
		const { post_id } = req.body;

		const savedBookmark = await bookmarkUsecase.createBookmark(
			user_id,
			post_id
		);

		res.status(201).json({
			success: true,
			message: 'Bookmark created successfully',
			data: savedBookmark,
		});
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});
api.get('/bookmarks', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;

		const bookmarks = await bookmarkUsecase.getAllBookmarks(user_id);

		if (!bookmarks) {
			throw createError(404, 'No bookmarks found');
		}

		res.status(200).json(bookmarks);
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

api.get('/bookmarks/:post_id', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;
		const { post_id } = req.params;

		const bookmark = await bookmarkUsecase.getBookmarkIdByPost(
			user_id,
			post_id
		);

		res.status(200).json(bookmark);
	} catch (error) {
		res.status(error.status || 500);

		res.json({
			succes: false,
			error: error.message,
		});
	}
});

api.delete('/bookmarks/:post_id', userAuth, async (req, res) => {
	try {
		const { user_id } = req.user;
		const { post_id } = req.params;

		const bookmarkDeleted = await bookmarkUsecase.deleteBookmark(
			user_id,
			post_id
		);

		res.status(200).json({
			deleted: true,
			message: 'Bookmark deleted successfully!',
			data: bookmarkDeleted,
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
