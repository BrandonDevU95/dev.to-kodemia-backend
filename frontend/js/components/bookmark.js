import {
	deleteBookmark,
	getAllBookmarksByUser,
	saveBookmarkUser,
} from '../api/bookmarksAPI.js';

import { getPostById } from '../api/postsAPI.js';
import { printPost } from '../components/posts.js';

let timeoutIdBookmarks;

const loadBookmarks = async (icons, user) => {
	const bookmarks = await getAllBookmarksByUser(user);
	if (bookmarks) {
		icons.forEach((icon) => {
			const isBookmarked = bookmarks.find(
				(bookmark) => bookmark.postId === icon.id
			);
			if (isBookmarked) {
				icon.classList.add('bi-bookmark-check-fill');
				icon.classList.add('text-warning');
				icon.classList.remove('bi-bookmark');
			}
		});
	}
};

const bookmarkIcon = (icons, user, reload) => {
	icons.forEach((icon) => {
		const parentElement = icon.parentNode;
		parentElement.disabled = false;
		icon.classList.remove('text-dark');
		icon.addEventListener('click', async () => {
			if (icon.classList.contains('bi-bookmark')) {
				parentElement.disabled = true;
				const res = await saveBookmarkUser(user, icon.id);
				if (res.name) {
					icon.classList.add('bi-bookmark-check-fill');
					icon.classList.add('text-warning');
					icon.classList.remove('bi-bookmark');
					parentElement.disabled = false;
				} else {
					console.error('Error al guardar el bookmark');
				}
			} else if (icon.classList.contains('bi-bookmark-check-fill')) {
				parentElement.disabled = true;
				const res = await deleteBookmark(user, icon.id);
				if (!res) {
					icon.classList.remove('text-warning');
					icon.classList.remove('bi-bookmark-check-fill');
					icon.classList.add('bi-bookmark');
					if (reload) {
						const bookmarkPosts = await getBookmarkByUser(user);
						if (!bookmarkPosts) {
							printNoPosts(
								'No tienes colecciones aún',
								'collections-lists'
							);
							parentElement.disabled = false;
							return;
						}
						printPost(bookmarkPosts, 'collections-lists');
						parentElement.disabled = false;
					}
					parentElement.disabled = false;
				} else {
					console.error('Error al eliminar el bookmark');
					parentElement.disabled = false;
				}
			}
		});
	});
};

const reloadBookmarks = async (user, time, reload) => {
	clearTimeout(timeoutIdBookmarks);

	timeoutIdBookmarks = setTimeout(async () => {
		const icons = document.querySelectorAll('.bi-bookmark');
		loadBookmarks(icons, user);
		bookmarkIcon(icons, user, reload);
	}, time || 1500);
};

const getBookmarkByUser = async (user) => {
	//Esta variable obtiene los objetos de la db bookmarks
	const collectionsUser = await getAllBookmarksByUser(user);

	if (collectionsUser.length === 0) return null;

	//Construye un nuevo array con los postId de los objetos de la db bookmarks
	const postIdArray = collectionsUser.map((item) => item.postId);

	const bookmarkPosts = await Promise.all(
		postIdArray.map(async (postId) => {
			const post = await getPostById(postId);
			return post;
		})
	);

	return bookmarkPosts;
};

const printNoPosts = (title, wrapperId) => {
	const wrapper = document.getElementById(wrapperId);

	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}

	const h1 = document.createElement('h1');
	h1.classList.add('text-center', 'p-4');
	h1.textContent = title;
	wrapper.appendChild(h1);
};

export { reloadBookmarks, getBookmarkByUser, printNoPosts };
