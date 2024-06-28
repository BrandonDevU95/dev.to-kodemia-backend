import { deletePost, verifyPostUser } from '../js/api/postsAPI.js';
import {
	getToken,
	getUserData,
	getUserInfo,
	logout,
} from '../js/api/usersAPI.js';
import {
	loadInfoUser,
	notificatiosnRandom,
	printCardUser,
} from '../js/components/users.js';

import { printDetailsPost } from '../js/components/posts.js';
import { reloadBookmarks } from '../js/components/bookmark.js';

const url = window.location.href;
const btnLogout = document.getElementById('logout');
const avatarImage = document.getElementById('avatar-image');
const params = new URLSearchParams(new URL(url).search);

const id = params.get('id');

if (!getToken()) {
	window.location.href = `../index.html`;
}

const { user, user_id } = getUserData();

btnLogout.addEventListener('click', () => {
	logout();
	window.location.href = '../index.html';
});

//Crear dos botones editar y eliminar e incertar en el wrapperId
const printControlsUser = async (postId, wrapperId) => {
	const wrapper = document.getElementById(wrapperId);
	const isVerified = await verifyPostUser(postId);

	if (isVerified) {
		const controls = document.createElement('div');
		controls.classList.add(
			'd-flex',
			'flex-column',
			'align-items-center',
			'gap-3'
		);

		const editBtn = document.createElement('button');
		editBtn.classList.add('btn', 'btn-primary', 'w-100');
		editBtn.setAttribute('type', 'button');
		const iconEdit = document.createElement('i');
		iconEdit.classList.add('bi', 'bi-pencil');
		editBtn.appendChild(iconEdit);

		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add('btn', 'btn-danger', 'w-100');
		deleteBtn.setAttribute('type', 'button');
		const iconDelete = document.createElement('i');
		iconDelete.classList.add('bi', 'bi-x-lg');
		deleteBtn.appendChild(iconDelete);

		editBtn.addEventListener('click', () => {
			window.location.href = `../views/edit.html?id=${postId}`;
		});

		deleteBtn.addEventListener('click', async () => {
			//Confirmar que desea elimianr el post
			const isDelete = confirm(
				'¿Estas seguro que deseas eliminar el post?'
			);
			if (isDelete) {
				const data = await deletePost(postId);
				if (!data) {
					window.location.href = '../views/home.html';
				} else {
					alert('No se pudo eliminar el post');
				}
			}
		});

		controls.appendChild(editBtn);
		controls.appendChild(deleteBtn);
		wrapper.appendChild(controls);
	}
};

const setIdBookmark = (id) => {
	const icons = document.querySelectorAll('.bi-bookmark');
	icons.forEach((icon) => {
		icon.id = id;
	});
};

(async () => {
	const { avatar } = await getUserInfo(user_id);
	avatarImage.src = avatar;
	avatarImage.alt = user_id;
	setIdBookmark(id);
	loadInfoUser(user_id);
	reloadBookmarks(user, 500);
})();

printDetailsPost(id, 'post-details');
printCardUser(id, 'user-details');
printControlsUser(id, 'aside-left-details');
notificatiosnRandom();
