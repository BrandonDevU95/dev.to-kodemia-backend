const URL_SERVER = 'http://localhost:3000/api';

import { getToken } from './usersAPI.js';

const createPost = async (postObject) => {
	const { accessToken, refreshToken } = getToken();
	if (!accessToken || !refreshToken) return null;

	let response = await fetch(`${URL_SERVER}/posts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken,
			'Refresh-Token': refreshToken,
		},
		body: JSON.stringify(postObject),
	});
	let { data } = await response.json();
	return data;
};

const updatePost = async (postObject, postId) => {
	const { accessToken, refreshToken } = getToken();
	if (!accessToken || !refreshToken) return null;

	let response = await fetch(`${URL_SERVER}/posts/${postId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken,
			'Refresh-Token': refreshToken,
		},
		body: JSON.stringify(postObject),
	});
	let { data } = await response.json();
	return data;
};

const deletePost = async (postId) => {
	const { accessToken, refreshToken } = getToken();
	if (!accessToken || !refreshToken) return null;

	let response = await fetch(`${URL_SERVER}/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			Authorization: accessToken,
			'Refresh-Token': refreshToken,
		},
	});
	let { data } = await response.json();
	return data;
};

const getPostById = async (postId) => {
	let response = await fetch(`${URL_SERVER}/posts/${postId}`);
	if (!response.ok) return null;

	let { data } = await response.json();
	return data;
};

const getAllPost = async () => {
	let response = await fetch(`${URL_SERVER}/posts`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getAllTags = async () => {
	let response = await fetch(`${URL_SERVER}/posts/tags`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getLastPosts = async (numPost) => {
	let response = await fetch(`${URL_SERVER}/posts/last-posts/${numPost}`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getAllCategories = async () => {
	let response = await fetch(`${URL_SERVER}/posts/categories`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getPostsMoreReactions = async (numPost) => {
	let response = await fetch(`${URL_SERVER}/posts/top-reactions/${numPost}`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getPostsByRelevant = async () => {
	let response = await fetch(`${URL_SERVER}/posts/relevant`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getPostByCategory = async (categoria) => {
	let response = await fetch(`${URL_SERVER}/posts/category/${categoria}`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getPostsByUsername = async (userId) => {
	let response = await fetch(`${URL_SERVER}/posts/author/${userId}`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const getAllPostByTag = async (tag) => {
	let response = await fetch(`${URL_SERVER}/posts/tag/${tag}`);
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

const verifyPostUser = async (postId) => {
	const { accessToken, refreshToken } = getToken();
	let response = await fetch(`${URL_SERVER}/posts/verify-post/${postId}`, {
		headers: {
			Authorization: accessToken,
			'Refresh-Token': refreshToken,
		},
	});
	if (!response.ok) return null;
	let { data } = await response.json();
	return data;
};

export {
	createPost,
	deletePost,
	getAllPost,
	getAllTags,
	updatePost,
	getPostById,
	getLastPosts,
	verifyPostUser,
	getAllPostByTag,
	getAllCategories,
	getPostByCategory,
	getPostsByUsername,
	getPostsByRelevant,
	getPostsMoreReactions,
};
