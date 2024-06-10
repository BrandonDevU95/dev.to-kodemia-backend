import { posts, users } from '../seedDB.js';

const POSTS_BASE_URL =
	'https://kodemia-devto-default-rtdb.firebaseio.com/posts';

const createPostsDB = () => {
	posts.forEach(async (post) => {
		const user = users[Math.floor(Math.random() * users.length)];
		const postUser = {
			...post,
			autor: {
				username: user.username,
				name: user.name.firstname + ' ' + user.name.lastname,
			},
		};
		await createPost(postUser);
	});
	console.log('Posts DB Success');
};

const verifyPostsDB = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();
	return data;
};

const createPost = async (postObject) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`, {
		method: 'POST',
		body: JSON.stringify(postObject),
	});
	let data = await response.json();
	return data;
};

const updatePost = async (postObject, postId) => {
	let response = await fetch(`${POSTS_BASE_URL}/${postId}.json`, {
		method: 'PUT',
		body: JSON.stringify(postObject),
	});
	let data = await response.json();
	return data;
};

const deletePost = async (postId) => {
	let response = await fetch(`${POSTS_BASE_URL}/${postId}.json`, {
		method: 'DELETE',
	});
	let data = await response.json();
	return data;
};

const getPostById = async (postId) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	const post = postsArray.filter((post) => post.key === postId);
	return post[0];
};

const getAllPost = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	postsArray.sort((a, b) => {
		return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
	});

	return postsArray;
};

const getAllTags = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Crea un array con todos los tags de los posts con una profundidad de 1
	let tagsArray = postsArray.map((post) => post.tags).flat();
	//Crea un objeto Set para almacenar valores únicos de tags
	let tagsSet = new Set(tagsArray);
	//Convierte el objeto Set a un array
	let tagsUnique = [...tagsSet];
	return tagsUnique;
};

const getLastPosts = async (numPost) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Ordenar los posts por fecha
	postsArray.sort((a, b) => {
		return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
	});

	//Obtener los ultimos 10 posts
	let lastPosts = postsArray.slice(0, numPost);
	return lastPosts;
};

const getAllCategories = async () => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	let categoriesArray = postsArray.map((post) => post.categoria);
	//Crea un objeto Set para almacenar valores únicos de categorias
	let categoriesSet = new Set(categoriesArray);
	//Convierte el objeto Set a un array
	let categoriesUnique = [...categoriesSet];
	return categoriesUnique;
};

const getPostsMoreReactions = async (numPost) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Ordenar los posts por numero de reacciones
	postsArray.sort((a, b) => {
		return b.numReacciones - a.numReacciones;
	});

	//Obtener los ultimos 10 posts
	return postsArray.slice(0, numPost);
};

const getPostsByRelevant = async (post = null) => {
	let relevantPosts;
	if (!post) {
		let response = await fetch(`${POSTS_BASE_URL}/.json`);
		let data = await response.json();
		let keys = Object.keys(data);

		let postsArray = keys.map((key) => ({ ...data[key], key }));
		// Regresa solo los post que tengas true en la propiedad relevante
		relevantPosts = postsArray.filter((post) => post.relevante);
		// regresa solo 3 post relevantes
		return relevantPosts.slice(0, 3);
	} else {
		relevantPosts = post.filter((post) => post.relevante);
		return relevantPosts;
	}
};

const getPostByCategory = async (categoria) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();
	let keys = Object.keys(data);

	// Regresa solo los post que tengan la categoria que se le pase
	let postsArray = keys.map((key) => ({ ...data[key], key }));
	let categoryPosts = postsArray.filter(
		(post) => post.categoria === categoria
	);

	// regresa solo 1 post random
	return categoryPosts[Math.floor(Math.random() * categoryPosts.length)];
};

const getPostsByUsername = async (username) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	//Ordenar los posts por fecha
	postsArray.sort((a, b) => {
		return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
	});

	// Regresa solo los post que tengan el username que se le pase
	let userPosts = postsArray.filter(
		(post) => post.autor.username === username
	);

	if (userPosts.length === 0) return null;

	return userPosts;
};

const getAllPostByTag = async (tag) => {
	let response = await fetch(`${POSTS_BASE_URL}/.json`);
	let data = await response.json();

	if (!data) return null;

	let keys = Object.keys(data);
	let postsArray = keys.map((key) => ({ ...data[key], key }));

	// Regresa solo los post que tengan el tag que se le pase
	let tagPosts = postsArray.filter((post) => post.tags.includes(tag));

	if (tagPosts.length === 0) return null;

	return tagPosts;
};

const verifyPostUser = async (username, postId) => {
	let response = await fetch(`${POSTS_BASE_URL}/${postId}.json`);
	let data = await response.json();

	if (!data) return null;

	if (data.autor.username === username) {
		return true;
	}

	return false;
};

export {
	createPost,
	deletePost,
	getAllPost,
	getAllTags,
	updatePost,
	getPostById,
	getLastPosts,
	verifyPostsDB,
	createPostsDB,
	verifyPostUser,
	getAllPostByTag,
	getAllCategories,
	getPostByCategory,
	getPostsByUsername,
	getPostsByRelevant,
	getPostsMoreReactions,
};
