import { getPostById, updatePost } from './api/postsAPI.js';

import { getToken } from './api/usersAPI.js';

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const id = params.get('id');

const image = document.getElementById('input-cover-image');
const title = document.getElementById('title-new-post');
const tags = document.getElementById('tags-new-post');
const category = document.getElementById('category-new-post');
const description = document.getElementById('description-new-post');
const footer = document.getElementById('footer-new-post');
const btnImage = document.getElementById('btn-cover-image');
const btnUpdate = document.getElementById('btn-update');

const tipTitle = document.getElementById('writting-post-title');
const tipTags = document.getElementById('writting-post-tags');
const tipDescription = document.getElementById('writting-post-description');
const tipFooter = document.getElementById('publishing-tips');

if (!getToken()) {
	window.location.href = '../index.html';
}

const originalPost = await getPostById(id);

(() => {
	title.value = originalPost.titulo;
	tags.value = originalPost.tags.join(',');
	category.value = originalPost.categoria;
	description.value = originalPost.descripcion;
	image.classList.remove('d-none');
	image.value = originalPost.imagen;
	btnImage.disabled = true;
})();

title.addEventListener('click', () => {
	tipTitle.classList.remove('d-none');
	tipTitle.classList.add('show');
	tipTags.classList.add('d-none');
	tipDescription.classList.add('d-none');
	tipFooter.classList.add('d-none');
});

tags.addEventListener('click', () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.remove('d-none');
	tipTags.classList.add('show');
	tipDescription.classList.add('d-none');
	tipFooter.classList.add('d-none');
});

description.addEventListener('click', () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.add('d-none');
	tipDescription.classList.remove('d-none');
	tipDescription.classList.add('show');
	tipFooter.classList.add('d-none');
});

footer.addEventListener('mouseover', () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.add('d-none');
	tipDescription.classList.add('d-none');
	tipFooter.classList.remove('d-none');
	tipFooter.classList.add('show');
});

btnUpdate.addEventListener('click', async () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.add('d-none');
	tipDescription.classList.add('d-none');
	tipFooter.classList.add('d-none');

	let tagsArray = tags.value.split(',').map((tag) => tag.trim());
	tagsArray = tagsArray.map((tag) => tag.replace(/\s+/g, ''));

	const post = {
		...originalPost,
		imagen: image.value,
		titulo: title.value,
		tags: tagsArray,
		categoria: category.value,
		descripcion: description.value,
	};

	delete post.key;

	const data = await updatePost(post, id);

	if (data) {
		window.location.href = '../views/user/profile.html';
	} else {
		alert('No se pudo actualizar');
	}
});

tags.addEventListener('keydown', (e) => {
	if (e.key === ' ') {
		let currentValue = e.target.value;
		e.target.value = currentValue + ',';
		e.preventDefault();
	}
});
