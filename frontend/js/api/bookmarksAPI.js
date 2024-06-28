const URL_SERVER = 'http://localhost:3000/api';

import { getToken } from './usersAPI.js';

const saveBookmarkUser = async (post_id) => {
	// console.log(post_id);
	// const { accessToken, refreshToken } = getToken();
	// console.log(accessToken, refreshToken);
	// let response = await fetch(`${URL_SERVER}/bookmarks`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application',
	// 		Authorization: accessToken,
	// 		'Refresh-Token': refreshToken,
	// 	},
	// 	body: JSON.stringify({ post_id }),
	// });
	// let data = await response.json();
	// if (!response.ok) {
	// 	console.log(data);
	// }
	// console.log(data);
	// return data;
};

const deleteBookmark = async (postId) => {
	const { accessToken, refreshToken } = getToken();
	let response = await fetch(`${URL_SERVER}/bookmarks/${postId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application',
			Authorization: accessToken,
			'Refresh-Token': refreshToken,
		},
	});
	let data = await response.json();
	return data;
};

const getBookmarkIdByPost = async (postId) => {
	let response = await fetch(`${URL_SERVER}/bookmarks/${postId}`);
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data;
};

const getAllBookmarksByUser = async () => {
	const { accessToken, refreshToken } = getToken();
	let response = await fetch(`${URL_SERVER}/bookmarks`, {
		headers: {
			'Content-Type': 'application',
			Authorization: accessToken,
			'Refresh-Token': refreshToken,
		},
	});
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data;
};

export {
	saveBookmarkUser,
	deleteBookmark,
	getBookmarkIdByPost,
	getAllBookmarksByUser,
};
