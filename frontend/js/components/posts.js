import {
	getAllCategories,
	getAllPost,
	getAllTags,
	getLastPosts,
	getPostByCategory,
	getPostById,
	getPostsMoreReactions,
} from '../api/postsAPI.js';

import { getAvatarByUsername } from '../api/usersAPI.js';
import { getToken } from '../api/usersAPI.js';

const token = getToken();

const createTag = (tag) => {
	const tagElement = document.createElement('div');
	tagElement.classList.add(
		'py-2',
		'px-3',
		'link-nav',
		'rounded',
		'border-0',
		'text-start'
	);
	const tagLink = document.createElement('a');
	tagLink.href = `../../views/tags.html?tag=${tag}`;
	tagLink.classList.add(
		'text-decoration-none',
		'd-flex',
		'align-items-center'
	);
	tagLink.textContent = `#${tag}`;
	tagElement.appendChild(tagLink);
	return tagElement;
};

const printTags = async () => {
	const wrapper = document.getElementById('popular-tags');
	const tags = await getAllTags();

	if (!tags) {
		noTags(wrapper);
		return;
	}

	tags.forEach((tag) => {
		const tagElement = createTag(tag);
		wrapper.appendChild(tagElement);
	});
};

const noTags = (wrapper) => {
	const noTags = document.createElement('p');
	noTags.classList.add('text-center', 'text-secondary');
	noTags.textContent = 'No tags available';
	wrapper.appendChild(noTags);
};

const createTabDiscuss = (post) => {
	const tabElement = document.createElement('div');
	tabElement.classList.add('p-3', 'border-bottom', 'border-light');
	const tabLink = document.createElement('a');
	const url = token ? 'details' : 'guestDetails';
	tabLink.href = `../../views/${url}.html?id=${post.key}`;
	tabLink.classList.add('text-decoration-none', 'text-discuss');
	const tabTitle = document.createElement('p');
	tabTitle.classList.add('m-0');
	//Limitar el titulo a 40 caracteres
	tabTitle.textContent =
		post.titulo.length > 30
			? post.titulo.substring(0, 40) + '...'
			: post.titulo;
	const tabComments = document.createElement('span');
	tabComments.classList.add('pt-1', 'fs-6', 'text-secondary');
	tabComments.textContent = `${post.numComentarios} comments`;
	tabLink.appendChild(tabTitle);
	tabLink.appendChild(tabComments);
	tabElement.appendChild(tabLink);
	return tabElement;
};

const insertTitleLastPosts = (title, wrapperId) => {
	const titlePost = document.getElementById(wrapperId);
	titlePost.textContent = title;
};

const AddBadgeNew = (wrapperId, position) => {
	position -= 1;
	const listPost =
		document.getElementById(wrapperId).children[position].children[0];

	const badge = document.createElement('div');
	badge.classList.add('pt-1');
	const etiquetaNuevo = document.createElement('span');
	etiquetaNuevo.textContent = 'New';
	etiquetaNuevo.classList.add('badge', 'bg-warning', 'text-danger');

	badge.appendChild(etiquetaNuevo);
	listPost.appendChild(badge);
};

const printLastPosts = async () => {
	const firstLastPosts = document.getElementById('first-last-posts');
	const secondLastPosts = document.getElementById('second-last-posts');
	const posts = await getLastPosts(10);

	insertTitleLastPosts(`#${posts[0].tags[0]}`, 'first-title-last-post');
	insertTitleLastPosts(`#${posts[1].tags[0]}`, 'second-title-last-post');

	//Imprimir los primeros 5 posts en firstLastPosts
	posts.slice(0, 5).forEach((post) => {
		const tabElement = createTabDiscuss(post);
		firstLastPosts.appendChild(tabElement);
	});

	//Imprimir los ultimos 5 posts en secondLastPosts
	posts.slice(5, 10).forEach((post) => {
		const tabElement = createTabDiscuss(post);
		secondLastPosts.appendChild(tabElement);
	});

	AddBadgeNew('first-last-posts', 5);
	AddBadgeNew('second-last-posts', 4);
	AddBadgeNew('second-last-posts', 5);
};

const createTab = (title, key) => {
	const tabElement = document.createElement('div');
	tabElement.classList.add('ms-3');
	const tabLink = document.createElement('a');
	const url = token ? 'details' : 'guestDetails';
	tabLink.href = `../../views/${url}.html?id=${key}`;
	tabLink.classList.add(
		'd-block',
		'text-decoration-none',
		'text-secondary',
		'widget',
		'rounded'
	);
	tabLink.textContent = title;
	tabElement.appendChild(tabLink);
	return tabElement;
};

const printCategories = async (wrapperId) => {
	const wrapper = document.getElementById(wrapperId);
	const categoriesArray = await getAllCategories();

	categoriesArray.forEach(async (category) => {
		const post = await getPostByCategory(category);
		const tabElement = createTab(category, post.key);
		wrapper.appendChild(tabElement);
	});
};

const printTrendingPosts = async (numPost, wrapperId) => {
	const wrapper = document.getElementById(wrapperId);
	const trendingPosts = await getPostsMoreReactions(numPost);

	trendingPosts.forEach((trend) => {
		const tabElement = createTab(trend.titulo, trend.key);
		wrapper.appendChild(tabElement);
	});
};

const createImageTop = (wrapperId, src, alt) => {
	const imageCardTop = document.createElement('img');
	imageCardTop.classList.add('card-img-top', 'object-fit-cover');
	imageCardTop.src = src;
	imageCardTop.alt = alt;
	imageCardTop.height = '275';

	wrapperId.appendChild(imageCardTop);
};

const createTagsInCard = (wrapperId, tags) => {
	tags.forEach((tag) => {
		const tagComponent = document.createElement('a');
		tagComponent.href = `../../views/tags.html?tag=${tag}`;
		tagComponent.classList.add(
			'text-decoration-none',
			'text-secondary',
			'px-2',
			'py-1',
			'tags-post',
			'rounded'
		);
		tagComponent.textContent = `#${tag}`;
		wrapperId.appendChild(tagComponent);
	});
};

const createPostCard = async (post, index, notImg) => {
	const div1 = document.createElement('div');
	div1.classList.add('mb-1');

	const div2 = document.createElement('div');
	div2.classList.add('card', 'border-light-subtle');

	const div3 = document.createElement('div');
	div3.id = 'image-first-post';

	if (index === 0 && !notImg) {
		createImageTop(div3, post.imagen, post.titulo);
	}

	div2.appendChild(div3);

	const div4 = document.createElement('div');
	div4.classList.add('p-3');

	const div5 = document.createElement('div');
	div5.classList.add(
		'mb-2',
		'd-flex',
		'align-items-center',
		'justify-content-between'
	);

	const div6 = document.createElement('div');
	div6.classList.add('d-flex', 'align-items-center', 'lh-1', 'fs-6');

	const div7 = document.createElement('div');
	div7.classList.add('me-2');

	const img = document.createElement('img');
	const avatar = await getAvatarByUsername(post.autor.username);
	img.src = avatar;
	img.alt = post.autor.name;
	img.classList.add('rounded-circle');
	img.width = '32';
	img.height = '32';
	div7.appendChild(img);

	const div8 = document.createElement('div');

	const p = document.createElement('p');
	p.classList.add('m-0', 'pb-1', 'fw-medium', 'text-capitalize');
	p.textContent = post.autor.name;
	div8.appendChild(p);

	const span = document.createElement('span');
	span.classList.add('fw-light');
	span.textContent = post.fechaCreacion;
	div8.appendChild(span);

	div6.appendChild(div7);
	div6.appendChild(div8);
	div5.appendChild(div6);
	div4.appendChild(div5);

	const div9 = document.createElement('div');
	div9.classList.add('mt-1', 'ps-4_5');

	const div10 = document.createElement('div');

	const a3 = document.createElement('a');
	const url = token ? 'details' : 'guestDetails';
	a3.href = `../../views/${url}.html?id=${post.key}`;
	a3.classList.add('text-decoration-none');

	const h2 = document.createElement('h2');
	h2.classList.add('mb-1', 'fs-4', 'fw-bold', 'px-2', 'text-discuss');
	h2.textContent = post.titulo;

	a3.appendChild(h2);
	div10.appendChild(a3);

	const div11 = document.createElement('div');
	div11.classList.add('mb-2', 'd-flex', 'flex-wrap', 'gap-1');

	createTagsInCard(div11, post.tags);

	div10.appendChild(div11);
	div9.appendChild(div10);

	const div12 = document.createElement('div');
	div12.classList.add(
		'd-flex',
		'justify-content-between',
		'align-items-center',
		'fs-6',
		'lh-1',
		'py-2'
	);

	const div13 = document.createElement('div');
	div13.classList.add('d-flex');

	const a4 = document.createElement('a');
	a4.href = '#';
	a4.classList.add(
		'text-decoration-none',
		'text-dark',
		'py-1',
		'px-2',
		'rounded',
		'btn-comments'
	);

	const div14 = document.createElement('div');
	div14.classList.add('d-flex', 'align-items-center');

	const span2 = document.createElement('span');
	span2.classList.add('d-flex', 'align-items-center', 'flex-row');
	span2.dir = 'rtl';

	const span3 = document.createElement('span');
	span3.classList.add(
		'd-flex',
		'align-items-center',
		'justify-content-center',
		'crayons_icon_container'
	);

	const img2 = document.createElement('img');
	img2.src =
		'https://dev.to/assets/fire-f60e7a582391810302117f987b22a8ef04a2fe0df7e3258a5f49332df1cec71e.svg';
	img2.width = '18';
	img2.height = '18';
	span3.appendChild(img2);

	const span4 = document.createElement('span');
	span4.classList.add(
		'd-flex',
		'align-items-center',
		'justify-content-center',
		'crayons_icon_container'
	);

	const img3 = document.createElement('img');
	img3.src =
		'https://dev.to/assets/raised-hands-74b2099fd66a39f2d7eed9305ee0f4553df0eb7b4f11b01b6b1b499973048fe5.svg';
	img3.width = '18';
	img3.height = '18';
	span4.appendChild(img3);

	const span5 = document.createElement('span');
	span5.classList.add(
		'd-flex',
		'align-items-center',
		'justify-content-center',
		'crayons_icon_container'
	);

	const img4 = document.createElement('img');
	img4.src =
		'https://dev.to/assets/exploding-head-daceb38d627e6ae9b730f36a1e390fca556a4289d5a41abb2c35068ad3e2c4b5.svg';
	img4.width = '18';
	img4.height = '18';
	span5.appendChild(img4);

	const span6 = document.createElement('span');
	span6.classList.add(
		'd-flex',
		'align-items-center',
		'justify-content-center',
		'crayons_icon_container'
	);

	const img5 = document.createElement('img');
	img5.src =
		'https://dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg';
	img5.width = '18';
	img5.height = '18';
	span6.appendChild(img5);

	const span7 = document.createElement('span');
	span7.classList.add(
		'd-flex',
		'align-items-center',
		'justify-content-center',
		'crayons_icon_container'
	);

	const img6 = document.createElement('img');
	img6.src =
		'https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg';
	img6.width = '18';
	img6.height = '18';
	span7.appendChild(img6);

	span2.appendChild(span3);
	span2.appendChild(span4);
	span2.appendChild(span5);
	span2.appendChild(span6);
	span2.appendChild(span7);

	const span8 = document.createElement('span');
	span8.classList.add('ms-3');

	const span9 = document.createElement('span');
	span9.classList.add('hidden', 's:inline');
	span9.textContent = `${post.numReacciones} reactions`;

	span8.appendChild(span9);
	div14.appendChild(span2);
	div14.appendChild(span8);
	a4.appendChild(div14);

	const a5 = document.createElement('a');
	a5.href = '#';
	a5.classList.add(
		'text-decoration-none',
		'text-dark',
		'py-1',
		'px-2',
		'rounded',
		'btn-comments',
		'd-flex',
		'align-items-center'
	);

	const icon = document.createElement('i');
	icon.classList.add('bi', 'bi-chat', 'me-2');

	const span10 = document.createElement('span');
	span10.textContent = 'Add Comment';
	a5.appendChild(icon);
	a5.appendChild(span10);

	div13.appendChild(a4);
	div13.appendChild(a5);
	div12.appendChild(div13);

	const div15 = document.createElement('div');
	div15.classList.add('d-flex', 'align-items-center', 'fw-light');

	const time = post.tiempoLectura.split(' ');
	const p2 = document.createElement('p');
	p2.classList.add('mb-0', 'me-2');
	p2.textContent = time[0];

	const span11 = document.createElement('span');
	span11.textContent = ` ${time[1]}`;
	p2.appendChild(span11);
	div15.appendChild(p2);

	const btnIcon = document.createElement('button');
	btnIcon.classList.add('btn', 'border-0', 'p-0');
	btnIcon.setAttribute('type', 'button');
	btnIcon.disabled = true;

	const i = document.createElement('i');
	i.id = post.key;
	i.classList.add(
		'bi',
		'bi-bookmark',
		'fs-5',
		'p-2',
		'btn-comments',
		'rounded'
	);
	btnIcon.appendChild(i);
	div15.appendChild(btnIcon);

	div12.appendChild(div15);
	div9.appendChild(div12);
	div4.appendChild(div9);
	div2.appendChild(div4);
	div1.appendChild(div2);

	return div1;
};

const printPost = async (posts, wrapperId, notImg = false) => {
	let wrapper = document.getElementById(wrapperId);

	if (!posts) {
		posts = await getAllPost();
	}

	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}

	posts.forEach(async (post, index) => {
		const postCard = await createPostCard(post, index, notImg);
		wrapper.appendChild(postCard);
	});
};

const createPostDetail = (post) => {
	const card = document.createElement('div');
	card.classList.add('card', 'border-light-subtle');

	const imageFirstPost = document.createElement('div');
	imageFirstPost.id = 'image-first-post';
	card.appendChild(imageFirstPost);

	const image = document.createElement('img');
	image.classList.add('card-img-top', 'object-fit-cover');
	image.src = post.imagen;
	image.alt = post.titulo;
	image.height = '340';
	imageFirstPost.appendChild(image);

	const px7 = document.createElement('div');
	px7.classList.add('px-7', 'pt-3_5');
	card.appendChild(px7);

	const mb4 = document.createElement('div');
	mb4.classList.add(
		'mb-4',
		'd-flex',
		'align-items-center',
		'justify-content-between'
	);
	px7.appendChild(mb4);

	const lh1 = document.createElement('div');
	lh1.classList.add('d-flex', 'align-items-center', 'lh-1');
	mb4.appendChild(lh1);

	const authorImage = document.createElement('div');
	const avatar = document.createElement('img');
	avatar.src = post.autor.avatar;
	avatar.classList.add('rounded-circle');
	avatar.width = '46';
	avatar.height = '46';
	avatar.alt = post.autor.name;
	authorImage.appendChild(avatar);
	lh1.appendChild(authorImage);

	const authorInfo = document.createElement('div');
	authorInfo.classList.add('mt-1', 'ps-2');
	lh1.appendChild(authorInfo);

	const authorName = document.createElement('p');
	authorName.classList.add('mb-1', 'fw-bold', 'text-capitalize', 'fs-5_5');
	authorName.textContent = post.autor.name;
	authorInfo.appendChild(authorName);

	const fechaCreacion = document.createElement('span');
	fechaCreacion.classList.add('fw-light', 'text-secondary', 'fs-xs');
	fechaCreacion.textContent = `Posted on ${new Date(
		post.fechaCreacion
	).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	})}`;
	authorInfo.appendChild(fechaCreacion);

	const py2 = document.createElement('div');
	py2.classList.add('py-2', 'd-flex', 'column-gap-4', 'flex-wrap');
	px7.appendChild(py2);
	const reactions = [
		{
			src: 'https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg',
			count: Math.floor(Math.random() * 25) + 1,
		},
		{
			src: 'https://dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg',
			count: Math.floor(Math.random() * 25) + 1,
		},
		{
			src: 'https://dev.to/assets/exploding-head-daceb38d627e6ae9b730f36a1e390fca556a4289d5a41abb2c35068ad3e2c4b5.svg',
			count: Math.floor(Math.random() * 25) + 1,
		},
		{
			src: 'https://dev.to/assets/raised-hands-74b2099fd66a39f2d7eed9305ee0f4553df0eb7b4f11b01b6b1b499973048fe5.svg',
			count: Math.floor(Math.random() * 25) + 1,
		},
		{
			src: 'https://dev.to/assets/fire-f60e7a582391810302117f987b22a8ef04a2fe0df7e3258a5f49332df1cec71e.svg',
			count: Math.floor(Math.random() * 25) + 1,
		},
	];

	//Ordenar el array de reacciones de mayor a menor
	reactions.sort((a, b) => b.count - a.count);

	reactions.forEach((reaction) => {
		const span = document.createElement('span');
		span.classList.add('d-flex', 'column-gap-1', 'align-items-center');
		py2.appendChild(span);

		const img = document.createElement('img');
		img.src = reaction.src;
		img.width = '24';
		img.height = '24';
		span.appendChild(img);

		const spanCount = document.createElement('span');
		spanCount.textContent = reaction.count;
		span.appendChild(spanCount);
	});

	const mt2 = document.createElement('div');
	mt2.classList.add('mt-2');
	px7.appendChild(mt2);

	const postInfo = document.createElement('div');
	mt2.appendChild(postInfo);

	const postCategory = document.createElement('h3');
	postCategory.classList.add('text-discuss', 'fs-5_5', 'mb-2');
	postCategory.textContent = post.categoria;

	const postTitle = document.createElement('h1');
	postTitle.classList.add('fw-bold');
	postTitle.textContent = post.titulo;

	postInfo.appendChild(postCategory);
	postInfo.appendChild(postTitle);

	const tagsContainer = document.createElement('div');
	tagsContainer.classList.add('mb-2', 'd-flex', 'flex-wrap', 'gap-1');
	postInfo.appendChild(tagsContainer);

	post.tags.forEach((tag) => {
		const tagLink = document.createElement('a');
		tagLink.href = `../../views/tags.html?tag=${tag}`;
		tagLink.classList.add(
			'text-decoration-none',
			'text-secondary',
			'px-2',
			'py-1',
			'tags-post',
			'rounded'
		);
		tagLink.textContent = `#${tag}`;
		tagsContainer.appendChild(tagLink);
	});

	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body', 'py-4_5', 'px-7');
	card.appendChild(cardBody);

	const postDescription = document.createElement('p');
	postDescription.classList.add('fs-5');
	postDescription.textContent = post.descripcion;
	cardBody.appendChild(postDescription);

	return card;
};
//TODO: Revisar que esten bien hechas estas 2 funciones
const setFavDetails = (fav, wrapperId) => {
	const wrapper = document.getElementById(wrapperId);
	wrapper.textContent = fav;
};

const printDetailsPost = async (id, wrapperId) => {
	const wrapper = document.getElementById(wrapperId);
	const post = await getPostById(id);
	const avatar = await getAvatarByUsername(post.autor.username);

	post.autor.avatar = avatar;
	const postDetail = createPostDetail(post);
	setFavDetails(post.numReacciones, 'fav-details');
	setFavDetails(post.numComentarios, 'comments-details');
	setFavDetails(Math.floor(Math.random() * 10) + 1, 'saved-details');
	wrapper.appendChild(postDetail);
};

const toggleClass = async (
	element,
	classToCompare,
	classToRemove,
	classToAdd,
	wrapperId,
	callback
) => {
	if (element.classList.contains(classToCompare)) {
		element.classList.remove(classToRemove);
		element.classList.add(classToAdd);
		await printPost(null, wrapperId);
	} else {
		element.classList.remove(classToAdd);
		element.classList.add(classToRemove);
		const post = await callback();
		await printPost(post, wrapperId);
	}
};

export {
	printTags,
	printPost,
	toggleClass,
	printLastPosts,
	printCategories,
	printDetailsPost,
	printTrendingPosts,
};
