import { getToken, getUserData } from './api/usersAPI.js';
import {
	loadAvatar,
	loadInfoUser,
	notificatiosnRandom,
	printAvatarsFollowers,
} from './components/users.js';
import { printCategories, printPost, printTags } from './components/posts.js';

import { getAllPostByTag } from './api/postsAPI.js';
import { reloadBookmarks } from './components/bookmark.js';

if (!getToken()) {
	window.location.href = '../views/login.html';
}

const { user } = getUserData();

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const tag = params.get('tag');

const btnLogout = document.getElementById('logout');
const tagTitle = document.querySelectorAll('#tag-title');
const posts = await getAllPostByTag(tag);

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../index.html';
});

tagTitle.forEach((title) => {
	title.textContent = `#${tag}`;
});

printPost(posts, 'posts-lists', true);
printTags();
printCategories('list-categories');
printAvatarsFollowers('avatars-followers');
loadAvatar(user, 'avatar-image');
loadInfoUser(user);
notificatiosnRandom();
reloadBookmarks(user, 1000, false);
