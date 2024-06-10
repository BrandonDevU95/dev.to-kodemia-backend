import {
	getNameByUsername,
	getToken,
	getUserData,
} from '../js/api/usersAPI.js';

import { createPost } from '../js/api/postsAPI.js';

const image = document.getElementById('input-cover-image');
const title = document.getElementById('title-new-post');
const tags = document.getElementById('tags-new-post');
const category = document.getElementById('category-new-post');
const description = document.getElementById('description-new-post');
const footer = document.getElementById('footer-new-post');
const btnImage = document.getElementById('btn-cover-image');
const btnPublish = document.getElementById('btn-publish');

const tipTitle = document.getElementById('writting-post-title');
const tipTags = document.getElementById('writting-post-tags');
const tipDescription = document.getElementById('writting-post-description');
const tipFooter = document.getElementById('publishing-tips');

if (!getToken()) {
	window.location.href = '../index.html';
}

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

btnImage.addEventListener('click', () => {
	image.classList.remove('d-none');
	btnImage.disabled = true;
});

btnPublish.addEventListener('click', async () => {
	tipTitle.classList.add('d-none');
	tipTags.classList.add('d-none');
	tipDescription.classList.add('d-none');
	tipFooter.classList.add('d-none');

	const { user } = await getUserData();
	const name = await getNameByUsername(user);

	let tagsArray = tags.value.split(',').map((tag) => tag.trim());
	tagsArray = tagsArray.map((tag) => tag.replace(/\s+/g, ''));

	const post = {
		autor: {
			name: name.firstname + ' ' + name.lastname,
			username: user,
		},
		imagen: image.value,
		titulo: title.value,
		tags: tagsArray,
		categoria: category.value,
		descripcion: description.value,
	};

	const postObject = createObjectPost(post);
	const data = await createPost(postObject);

	if (data.name) {
		window.location.href = '../views/home.html';
	} else {
		alert('Error al crear el post');
	}
});

tags.addEventListener('keydown', (e) => {
	if (e.key === ' ') {
		let currentValue = e.target.value;
		e.target.value = currentValue + ',';
		e.preventDefault();
	}
});

const createObjectPost = (post) => {
	let { imagen, titulo, tags, categoria, descripcion, autor } = post;
	if (imagen === '') {
		imagen = 'https://picsum.photos/650/275';
	}

	const date = new Date();
	const fechaCreacion = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;

	const postObject = {
		autor: {
			name: autor.name,
			username: autor.username,
		},
		categoria,
		descripcion,
		fechaCreacion,
		imagen: imagen,
		numComentarios: Math.floor(Math.random() * 30) + 1,
		numReacciones: Math.floor(Math.random() * 100) + 1,
		tags,
		tiempoLectura: `${Math.floor(Math.random() * 10) + 1} minutos`,
		titulo,
	};

	return postObject;
};
