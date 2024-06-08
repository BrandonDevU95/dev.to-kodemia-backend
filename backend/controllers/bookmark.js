const Bookmark = require('../models/bookmark');
const { validateBookmark } = require('../schemas/bookmark');
const createError = require('http-errors');

const createBookmark = async (req, res) => {
	const { user_id } = req.user;
	const { post_id } = req.body;

	const bookmarkData = {
		post: post_id,
		user: user_id,
	};
	const bookmarkFields = validateBookmark(bookmarkData);

	if (!bookmarkFields.success) {
		throw createError(400, JSON.parse(bookmarkFields.error.message));
	}

	const tempBookmark = {
		...bookmarkFields.data,
		user: user_id,
	};

	const bookmark = new Bookmark(tempBookmark);

	try {
		await bookmark.save();
		res.status(201).json({
			saved: true,
			message: 'Bookmark saved successfully!',
		});
	} catch (error) {
		throw createError(400, error.message);
	}
};

const getAllBookmarks = async (req, res) => {
	const { user_id } = req.user;

	try {
		const bookmarks = await Bookmark.find({ user: user_id }).sort({
			created_at: -1,
		});

		if (!bookmarks) {
			throw createError(404, 'No bookmarks found');
		}

		res.status(200).json(bookmarks);
	} catch (error) {
		throw createError(400, error.message);
	}
};

const getBookmarkIdByPost = async (req, res) => {
	const { user_id } = req.user;
	const { post_id } = req.params;

	try {
		const bookmark = await Bookmark.findOne({
			user: user_id,
			post: post_id,
		});

		if (!bookmark) {
			throw createError(404, 'Bookmark not found');
		}

		res.status(200).json(bookmark);
	} catch (error) {
		throw createError(400, error.message);
	}
};

const deleteBookmark = async (req, res) => {
	const { user_id } = req.user;
	const { post_id } = req.params;

	try {
		const bookmark = await Bookmark.findOneAndDelete({
			user: user_id,
			post: post_id,
		});

		if (!bookmark) {
			throw createError(404, 'Bookmark not found');
		}

		res.status(200).json({
			deleted: true,
			message: 'Bookmark deleted successfully!',
		});
	} catch (error) {
		throw createError(400, error.message);
	}
};

module.exports = {
	createBookmark,
	getAllBookmarks,
	getBookmarkIdByPost,
	deleteBookmark,
};
