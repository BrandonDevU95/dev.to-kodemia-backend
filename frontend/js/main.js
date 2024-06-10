import { createPostsDB, getAllPost, verifyPostsDB } from './api/postsAPI.js';
import { createUsersDB, verifyUsersDB } from './api/usersAPI.js';
import {
	printCategories,
	printLastPosts,
	printPost,
	printTags,
	printTrendingPosts,
} from '../js/components/posts.js';

import { getToken } from './api/usersAPI.js';

if (getToken()) {
	window.location.href = '../views/home.html';
}

const search = document.getElementById('input-search');
let timeoutSearch;

const loadPage = () => {
	printPost(null, 'posts-lists');
	printTags();
	printLastPosts();
	printTrendingPosts(10, 'trends-list');
	printCategories('list-categories');
};

search.addEventListener('keyup', async (e) => {
	clearTimeout(timeoutSearch);

	timeoutSearch = setTimeout(async () => {
		const query = e.target.value;

		const posts = await getAllPost();

		const result = posts.filter((post) =>
			post.titulo.toLowerCase().includes(query.toLowerCase())
		);

		await printPost(result, 'posts-lists');
	}, 500);
});
//crea una funcion anonima autoejecutable para cargar la DB
(async () => {
	const posts = await verifyPostsDB();
	const users = await verifyUsersDB();
	if (!posts) createPostsDB();
	if (!users) createUsersDB();
	loadPage();
})();
