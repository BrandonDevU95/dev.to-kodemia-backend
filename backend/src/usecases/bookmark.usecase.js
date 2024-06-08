const Bookmark = require('../models/bookmark.model');
const { validateBookmark } = require('../schemas/bookmark.schema');
const createError = require('http-errors');

async function createBookmark(user_id, post_id) {
	const bookmarkData = validateBookmark({
		user: user_id,
		post: post_id,
	});

	if (!bookmarkData.success) {
		throw createError(400, JSON.parse(bookmarkData.error.message));
	}

	const bookmark = new Bookmark(bookmarkData.data);

	const bookmarkExists = await Bookmark.findOne({
		user: user_id,
		post: post_id,
	});

	if (bookmarkExists) {
		throw createError(400, 'Bookmark already exists');
	}

	const savedBookmark = await bookmark.save();
	return savedBookmark;
}

async function getAllBookmarks(user_id) {
	const bookmarks = await Bookmark.find({ user: user_id }).sort({
		created_at: -1,
	});

	if (!bookmarks) {
		throw createError(404, 'No bookmarks found');
	}

	return bookmarks;
}

async function getBookmarkIdByPost(user_id, post_id) {
	const bookmark = await Bookmark.findOne({
		user: user_id,
		post: post_id,
	});

	if (!bookmark) {
		throw createError(404, 'Bookmark not found');
	}

	return bookmark;
}

async function deleteBookmark(user_id, post_id) {
	const bookmark = await Bookmark.findOneAndDelete({
		user: user_id,
		post: post_id,
	});

	if (!bookmark) {
		throw createError(404, 'Bookmark not found');
	}

	return bookmark;
}

module.exports = {
	createBookmark,
	getAllBookmarks,
	getBookmarkIdByPost,
	deleteBookmark,
};
