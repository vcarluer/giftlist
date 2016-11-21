function login() {
	var password = document.getElementById('loginpass').value;
	document.location.href = '/login/do?loginpass=' + password;
}

function logout() {
	document.location.href = '/login/out'
}
