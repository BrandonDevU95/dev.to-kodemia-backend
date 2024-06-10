import {
	login,
	decodeToken,
	setToken,
	setUserData,
	getToken,
} from '../js/api/usersAPI.js';

if (getToken()) {
	window.location.href = '../views/home.html';
}

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', async (event) => {
	const fields = document.querySelectorAll('#login-form input');
	const form = document.querySelectorAll('.needs-validation');
	const userObject = {};

	if (!form[0].checkValidity()) {
		event.preventDefault();
		event.stopPropagation();
		form[0].classList.add('was-validated');
		return;
	}

	fields.forEach((field) => {
		if (field.type === 'checkbox') {
			userObject[field.name] = field.checked;
		} else {
			userObject[field.name] = field.value;
		}
	});

	const { token } = await login(userObject);
	setToken(token);
	const user = decodeToken(token);
	setUserData(user);
	form[0].classList.remove('was-validated');
	form[0].reset();
	window.location.href = '../views/home.html';
});
