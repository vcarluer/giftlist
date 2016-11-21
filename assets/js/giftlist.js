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
			document.getElementById('giftPicture').value = "";
			document.getElementById('giftName').value = "";
			document.getElementById('giftDescription').value = "";
			document.getElementById('giftPrice').value = "";
			document.getElementById('giftChild').value = "";
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
			document.getElementById('removeName').value = "";
		}
	});
}

function take(name, takeValue) {
	var giftData = {
		name: name,
		take: takeValue
	};
	reqwest({
		url: '/gift/take',
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
			success: function(gifts) {
				console.log(gifts);
				giftList.innerHTML = "";
				gifts.forEach(function(gift) {
					var giftDiv = document.createElement('div');
					giftDiv.innerHTML += "<div>";
					giftDiv.innerHTML += "<img src='" + gift.picture + "'>";
					giftDiv.innerHTML += gift.name;
					giftDiv.innerHTML += "<input type='button' onclick='take(\"" + gift.name + "\", true)' value='take'></input>";
					giftDiv.innerHTML += "<input type='button' onclick='take(\"" + gift.name + "\", false)' value='untake'></input>";
					giftList.appendChild(giftDiv);
				});
			}
		});
	}
});
