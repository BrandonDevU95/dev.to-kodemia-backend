import { getToken } from '../js/api/usersAPI.js';
import { printDetailsPost } from '../js/components/posts.js';

if (getToken()) {
	window.location.href = '../index.html';
}

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);

const id = params.get('id');

printDetailsPost(id, 'post-details');
