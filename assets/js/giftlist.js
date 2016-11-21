function login() {
	var password = document.getElementById('loginpass').value;
	document.location.href = '/login/do?loginpass=' + password;
}

function logout() {
	document.location.href = '/login/out'
}

function createGift() {
	var giftData = {
		picture: document.getElementById('giftPicture').value,
		name: document.getElementById('giftName').value,
		description: document.getElementById('giftDescription').value,
		price: document.getElementById('giftPrice').value,
		child: document.getElementById('giftChild').value
	};
	reqwest({
		url: '/gift/create',
		method: 'post',
		data: giftData,
		error: function(err) {
			console.log(err);
		},
		success: function(resp) {
			console.log(resp);
		}
	});
}

function removeGift() {
	var giftData = {
		name: document.getElementById('removeName').value
	};
	reqwest({
		url: '/gift/del',
		method: 'post',
		data: giftData,
		error: function(err) {
			console.log(err);
		},
		success: function(resp) {
			console.log(resp);
		}
	});
}

function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function() {
	var giftList = document.getElementById('giftList');
	if (giftList) {
		reqwest({
			url: '/list/get',
			method: 'get',
			error: function(err) {
				console.log(err);
			},
			success: function(resp) {
				console.log(resp);
			}
		});
	}
});
