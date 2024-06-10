import { access } from 'fs';
import { users } from '../seedDB.js';

const USERS_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/users';
const AUTH_BASE_URL = 'https://fakestoreapi.com/auth/login';
const URL_SERVER = 'http://localhost:3000/api';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER = 'user';

const createUsersDB = () => {
	users.forEach(async (user) => {
		await createUser(user);
	});
	console.log('Users DB Success');
};

const verifyUsersDB = async () => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	return data;
};

const createUser = async (userObject) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`, {
		method: 'POST',
		body: JSON.stringify(userObject),
	});
	let data = await response.json();
	return data;
};

const getUserByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user];
};

const getAvatarByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].avatar;
};

const getAboutUserByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].acerca;
};

const getNameByUsername = async (username) => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let user = keys.find((key) => data[key].username === username);
	return data[user].name;
};

const getAllAvatarUsers = async () => {
	let response = await fetch(`${USERS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);
	let avatars = keys.map((key) => {
		return {
			username: data[key].username,
			imagen: data[key].avatar,
		};
	});
	return avatars;
};

const login = async (userObject) => {
	let response = await fetch(`${URL_SERVER}/login`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			username: userObject.username,
			password: userObject.password,
		}),
	});
	let data = await response.json();
	return data;
};

const logout = () => {
	localStorage.removeItem(ACCESS_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
	localStorage.removeItem(USER);
};

const setToken = (access_token, refresh_token) => {
	localStorage.setItem(ACCESS_TOKEN, access_token);
	localStorage.setItem(REFRESH_TOKEN, refresh_token);
};

const getToken = () => {
	const access_token = localStorage.getItem(ACCESS_TOKEN);
	const refresh_token = localStorage.getItem(REFRESH_TOKEN);
	return { access_token, refresh_token };
};

const setUserData = (user) => {
	localStorage.setItem(USER, JSON.stringify(user));
};

const getUserData = () => {
	return JSON.parse(localStorage.getItem(USER));
};

const decodeToken = (token) => {
	const payload = token.split('.')[1];
	const decodedPayload = atob(payload);
	return JSON.parse(decodedPayload);
};

export {
	login,
	logout,
	getToken,
	setToken,
	createUser,
	setUserData,
	getUserData,
	decodeToken,
	createUsersDB,
	verifyUsersDB,
	getUserByUsername,
	getAllAvatarUsers,
	getNameByUsername,
	getAvatarByUsername,
	getAboutUserByUsername,
};
