import {
	createPostsDB,
	getAllPost,
	getLastPosts,
	getPostsByRelevant,
	getPostsMoreReactions,
	verifyPostsDB,
} from '../js/api/postsAPI.js';
import {
	createUsersDB,
	getToken,
	getUserData,
	logout,
	verifyUsersDB,
} from '../js/api/usersAPI.js';
import {
	loadAvatar,
	loadInfoUser,
	notificatiosnRandom,
} from './components/users.js';
import {
	printCategories,
	printLastPosts,
	printPost,
	printTags,
	printTrendingPosts,
	toggleClass,
} from '../js/components/posts.js';

import { reloadBookmarks } from '../js/components/bookmark.js';

if (!getToken()) {
	window.location.href = '../index.html';
}

const { user } = getUserData();

const search = document.getElementById('input-search');
const relevant = document.getElementById('relevant');
const latest = document.getElementById('latest');
const top = document.getElementById('top');
const btnLogout = document.getElementById('logout');
let timeoutSearch;

const loadPage = () => {
	printPost(null, 'posts-lists');
	printTags();
	printLastPosts();
	printTrendingPosts(10, 'trends-list');
	printCategories('list-categories');

	reloadBookmarks(user, 1500, false);
};

relevant.addEventListener('click', async () => {
	//Ver si se puede hacer una funcion para no repetir tanto codigo
	latest.classList.remove('fw-bold');
	latest.classList.add('fw-lighter');
	top.classList.remove('fw-bold');
	top.classList.add('fw-lighter');

	await toggleClass(
		relevant,
		'fw-bold',
		'fw-bold',
		'fw-lighter',
		'posts-lists',
		getPostsByRelevant
	);
	reloadBookmarks(user, 1000, false);
});

latest.addEventListener('click', async () => {
	relevant.classList.remove('fw-bold');
	relevant.classList.add('fw-lighter');
	top.classList.remove('fw-bold');
	top.classList.add('fw-lighter');

	await toggleClass(
		latest,
		'fw-bold',
		'fw-bold',
		'fw-lighter',
		'posts-lists',
		() => getLastPosts(3)
	);
	reloadBookmarks(user, 1000, false);
});

top.addEventListener('click', async () => {
	relevant.classList.remove('fw-bold');
	relevant.classList.add('fw-lighter');
	latest.classList.remove('fw-bold');
	latest.classList.add('fw-lighter');

	await toggleClass(
		top,
		'fw-bold',
		'fw-bold',
		'fw-lighter',
		'posts-lists',
		() => getPostsMoreReactions(3)
	);

	reloadBookmarks(user, 1000, false);
});

search.addEventListener('keyup', async (e) => {
	clearTimeout(timeoutSearch);

	timeoutSearch = setTimeout(async () => {
		const query = e.target.value;

		const posts = await getAllPost();

		const result = posts.filter((post) =>
			post.titulo.toLowerCase().includes(query.toLowerCase())
		);

		await printPost(result, 'posts-lists');
		reloadBookmarks(user, 1000, false);
	}, 500);
});

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../index.html';
});

//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	const posts = await verifyPostsDB();
	const users = await verifyUsersDB();
	if (!posts) createPostsDB();
	if (!users) createUsersDB();
	loadPage();
	loadAvatar(user, 'avatar-image');
	loadInfoUser(user);
	notificatiosnRandom();
})();
