const URL_SERVER = 'http://localhost:3000/api';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const USER = 'user';

const createUser = async (userObject) => {
	let response = await fetch(`${URL_SERVER}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userObject),
	});
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data;
};

const getUserByUsername = async (username) => {
	let response = await fetch(`${URL_SERVER}/user/username/${username}`);
	let { data } = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data;
};

const getAvatarByUsername = async (username) => {
	let response = await fetch(`${URL_SERVER}/user/username/${username}`);
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data.user.avatar;
};

const getAboutUserByUsername = async (username) => {
	let response = await fetch(`${URL_SERVER}/user/username/${username}`);
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data.user.about;
};

const getNameByUsername = async (username) => {
	let response = await fetch(`${URL_SERVER}/user/username/${username}`);
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data.user.name;
};

const getAllAvatarUsers = async () => {
	let response = await fetch(`${URL_SERVER}/user/avatars`);
	let data = await response.json();
	if (!response.ok) {
		console.log(data);
	}
	return data;
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
	let { accessToken, refreshToken } = await response.json();

	return { accessToken, refreshToken };
};

const logout = () => {
	localStorage.removeItem(ACCESS_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
	localStorage.removeItem(USER);
};

const setToken = (accessToken, refreshToken) => {
	localStorage.setItem(ACCESS_TOKEN, accessToken);
	localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const getToken = () => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN);
	const refreshToken = localStorage.getItem(REFRESH_TOKEN);
	if (!accessToken || !refreshToken) return null;
	return { accessToken, refreshToken };
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
	getUserByUsername,
	getAllAvatarUsers,
	getNameByUsername,
	getAvatarByUsername,
	getAboutUserByUsername,
};
