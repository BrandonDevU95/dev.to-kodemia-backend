const express = require('express');
const BookmarkController = require('../controllers/bookmark');
const { userAuth } = require('../middlewares/authenticated');

const api = express.Router();

api.post('/bookmarks', userAuth, BookmarkController.createBookmark);
api.get('/bookmarks', userAuth, BookmarkController.getAllBookmarks);
api.get(
	'/bookmarks/:post_id',
	userAuth,
	BookmarkController.getBookmarkIdByPost
);
api.delete('/bookmarks/:post_id', userAuth, BookmarkController.deleteBookmark);

module.exports = api;
