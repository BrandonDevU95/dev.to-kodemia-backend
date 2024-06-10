import { getBookmarkByUser, printNoPosts } from '../components/bookmark.js';
import {
	getToken,
	getUserByUsername,
	getUserData,
	logout,
} from '../api/usersAPI.js';
import { loadInfoUser, notificatiosnRandom } from '../components/users.js';

import { getPostsByUsername } from '../api/postsAPI.js';
import { printPost } from '../components/posts.js';
import { reloadBookmarks } from '../components/bookmark.js';

if (!getToken()) window.location.href = '../../index.html';

const btnLogout = document.getElementById('logout');
const avatar = document.querySelectorAll('#avatar-image');

const profile = document.getElementById('my-profile');
const posts = document.getElementById('my-posts');
const collections = document.getElementById('my-collections');

const profileTab = document.getElementById('profile-tab');
const postsTab = document.getElementById('posts-tab');
const collectionsTab = document.getElementById('collections-tab');

const { user } = getUserData();

//No hay una funcion de entrada como en home, espera los eventos de los botones
btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../../index.html';
});

profile.addEventListener('click', () => {
	profile.querySelector('a').classList.add('active');
	posts.querySelector('a').classList.remove('active');
	collections.querySelector('a').classList.remove('active');

	profileTab.classList.contains('d-none') &&
		profileTab.classList.remove('d-none');
	postsTab.classList.add('d-none');
	collectionsTab.classList.add('d-none');
});

posts.addEventListener('click', async () => {
	posts.querySelector('a').classList.add('active');
	profile.querySelector('a').classList.remove('active');
	collections.querySelector('a').classList.remove('active');

	postsTab.classList.contains('d-none') &&
		postsTab.classList.remove('d-none');

	profileTab.classList.add('d-none');
	collectionsTab.classList.add('d-none');

	const postsUser = await getPostsByUsername(user);

	if (!postsUser) {
		printNoPosts('No tienes post aún', 'posts-lists');
		return;
	}

	printPost(postsUser, 'posts-lists');
	reloadBookmarks(user, 1000, true);
});

collections.addEventListener('click', async () => {
	collections.querySelector('a').classList.add('active');
	profile.querySelector('a').classList.remove('active');
	posts.querySelector('a').classList.remove('active');

	collectionsTab.classList.contains('d-none') &&
		collectionsTab.classList.remove('d-none');
	profileTab.classList.add('d-none');
	postsTab.classList.add('d-none');

	const bookmarkPosts = await getBookmarkByUser(user);

	if (!bookmarkPosts) {
		printNoPosts('No tienes colecciones aún', 'collections-lists');
		return;
	}

	printPost(bookmarkPosts, 'collections-lists');
	reloadBookmarks(user, 1000, true);
});

//Funcion que carga los datos del usuario en el perfil desde el inicio
(async () => {
	const userObject = await getUserByUsername(user);
	const fields = document.querySelectorAll(
		'#form-profile input , #form-profile textarea'
	);
	loadInfoUser(user);
	notificatiosnRandom();

	//Revisar esta funcion para que funcione con el avatar
	avatar.forEach((img) => {
		img.src = userObject.avatar;
		img.alt = userObject.username;
	});

	const newUser = {
		fullname: userObject.name.firstname + ' ' + userObject.name.lastname,
		username: userObject.username,
		email: userObject.email,
		phone: userObject.phone,
		address: `${userObject.address.street} - ${userObject.address.number}, ${userObject.address.city}, CP. ${userObject.address.zipcode}.`,
		about: userObject.acerca,
	};

	fields.forEach((field) => {
		const key = field.name;
		field.value = newUser[key];
		field.addEventListener('change', () => {
			newUser[key] = field.value;
		});
	});
})();
