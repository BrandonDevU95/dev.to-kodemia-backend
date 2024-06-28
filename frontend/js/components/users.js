import { getAllAvatarUsers, getUserInfo } from '../api/usersAPI.js';

import { getPostById } from '../api/postsAPI.js';

const createUserCardInfo = async (user) => {
	const card = document.createElement('div');
	card.classList.add('card');

	const cardImgTop = document.createElement('div');
	cardImgTop.classList.add('card-img-top', 'info-user-top');
	card.appendChild(cardImgTop);

	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body', 'pt-0', 'd-grid', 'gap-3');
	card.appendChild(cardBody);

	const userDiv = document.createElement('div');
	cardBody.appendChild(userDiv);

	const userImg = document.createElement('img');
	userImg.src = user.avatar;
	userImg.classList.add('rounded-circle', 'margin-avatar');
	userImg.width = 48;
	userImg.height = 48;
	userImg.alt = user.author;
	userDiv.appendChild(userImg);

	const userName = document.createElement('span');
	userName.classList.add(
		'fw-bold',
		'fs-5',
		'fw-bold',
		'ps-2',
		'text-capitalize'
	);
	const { name, created_at } = await getUserInfo(user.author);
	userName.textContent = `${name.firstname} ${name.lastname}`;
	userDiv.appendChild(userName);

	const followButtonDiv = document.createElement('div');
	followButtonDiv.classList.add('d-grid');
	cardBody.appendChild(followButtonDiv);

	const followButton = document.createElement('button');
	followButton.type = 'button';
	followButton.classList.add('btn', 'btn-primary');
	followButton.textContent = 'Follow';
	followButtonDiv.appendChild(followButton);

	const descriptionDiv = document.createElement('div');
	cardBody.appendChild(descriptionDiv);

	const descriptionText = document.createElement('p');
	descriptionText.classList.add('card-text', 'text-secondary');
	descriptionText.textContent = user.about;
	descriptionDiv.appendChild(descriptionText);

	const joinedDiv = document.createElement('div');
	cardBody.appendChild(joinedDiv);

	const joinedLabel = document.createElement('p');
	joinedLabel.classList.add(
		'm-0',
		'text-dark',
		'fw-bold',
		'text-uppercase',
		'fs-xs'
	);
	joinedLabel.textContent = 'Joined';
	joinedDiv.appendChild(joinedLabel);

	const joinedDate = document.createElement('span');
	joinedDate.textContent = Date(created_at).slice(0, 15);
	joinedDiv.appendChild(joinedDate);
	return card;
};

const printCardUser = async (id, wrapperId) => {
	const post = await getPostById(id);
	const wrapper = document.getElementById(wrapperId);
	const { avatar } = await getUserInfo(post.author);
	const { about } = await getUserInfo(post.author);

	const user = {
		avatar,
		author: post.author,
		about,
	};

	const card = await createUserCardInfo(user);
	wrapper.appendChild(card);
};

const loadInfoUser = async (user_id) => {
	const userInfo = await getUserInfo(user_id);
	const name = document.getElementById('info-name-user');
	const username = document.getElementById('info-username-user');

	name.textContent = `${userInfo.name.firstname} ${userInfo.name.lastname}`;
	username.textContent = `@${userInfo.username}`;
};

const loadAvatar = async (user_id, wrapperId) => {
	const avatarImage = document.getElementById(wrapperId);
	const { avatar } = await getUserInfo(user_id);
	avatarImage.src = avatar;
	avatarImage.alt = user_id;
};

const notificatiosnRandom = () => {
	const notifications = document.getElementById('notifications-user');
	const number = Math.floor(Math.random() * 10);
	notifications.textContent = number;
};

const printAvatarsFollowers = async (wrapperId) => {
	const wrapper = document.getElementById(wrapperId);
	const avatars = await getAllAvatarUsers();

	avatars.forEach((avatar) => {
		const card = document.createElement('a');
		card.href = '#';
		const img = document.createElement('img');
		img.src = avatar.imagen;
		img.classList.add('rounded-circle');
		img.width = 48;
		img.height = 48;
		img.alt = avatar.username;
		card.appendChild(img);
		wrapper.appendChild(card);
	});
};

export {
	printCardUser,
	loadInfoUser,
	notificatiosnRandom,
	loadAvatar,
	printAvatarsFollowers,
};
