function getUser(json, userSearch) {
	// Define variables
	let i = 0;
	let isId = !isNaN(userSearch);

	// Go through all of the json and find user then return their data
	while (i < Object.keys(json).length) {
		switch (isId) {
			case false:
				if (json[i].nickname == userSearch) {
					return json[i];
				}
				break;
			default:
				if (json[i].id == userSearch) {
					return json[i];
				}
				break;
		}
		i++;
	}
}

function checkUser(json, user) {
	u = new getUser(json, user);

	if (!(u == null || u == undefined || u == '') || !u.disabled) {
		// If not disabled or missing then:
		if (u.desc !== null) {
			// If there is a description then: set it to userdescReg
			document.getElementById('userdescReg').innerHTML = u.desc;
		}

		switch (u.role) {
			// How this works
			// Positive value = Normal or Good
			// Negative value = Bad
			case 3:
				// Only the real Me can have this role
				document.getElementById('userroleReg').innerHTML = 'Creator';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #0000ff; margin: 10;');
				break;
			case 2:
				// Only the real Jerry (The logo of this website) can have this role
				document.getElementById('userroleReg').innerHTML = 'Jerry';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #accc5c; margin: 10;');
				break;
			case 1:
				// Only website administrators who have registered can have this role
				document.getElementById('userroleReg').innerHTML =
					'Administrator';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #accc5c; margin: 10;');
				break;
			case 0:
				// This role is applied once the user makes an interaction (Like submitting games!)
				document.getElementById('userroleReg').innerHTML =
					'Normal user';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #42adeb; margin: 10;');
				break;
			case -1:
				// This role is applied when a user is suspect of breaking the rules
				switch (holidayWereOn) {
					// We receive "holidayWereOn" from the holidays.js (If it is embedded)
					case 'christmas':
						// Santa won't give this user what he wants!
						document.getElementById('userroleReg').innerHTML =
							'Naughty user';
						document
							.getElementById('userroleReg')
							.setAttribute(
								'style',
								'color: #9f0000; margin: 10;'
							);
						break;
					default:
						// The FBI is watching you!
						document.getElementById('userroleReg').innerHTML =
							'Onwatch user';
						document
							.getElementById('userroleReg')
							.setAttribute(
								'style',
								'color: #ff0000; margin: 10;'
							);
						break;
				}
				break;
			case -2:
				// This role is applied when a user was onwatch (Starts to have good behavior, will be removed if it is comfirmed that user is sorry of what he did)
				document.getElementById('userroleReg').innerHTML =
					'Still untrusted user';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #ffff00; margin: 10;');
				break;
			case -3:
				// Only the fakers can have this role
				document.getElementById('userroleReg').innerHTML = 'FAKER';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #ff0000; margin: 10;');
				break;
			default:
				// If no role was set, the user never submitted a game
				document.getElementById('userroleReg').innerHTML = 'Unset';
				document
					.getElementById('userroleReg')
					.setAttribute('style', 'color: #353535; margin: 10;');
				break;
		}

		document
			.getElementById('useremailReg')
			.setAttribute('href', 'mailto:' + u.email);
		document
			.getElementById('usericoReg')
			.setAttribute('src', '/assets/images/users/' + u.id + '.png');
		document.title = 'TheGamePlace - ' + u.nickname;
		document.getElementById('usernameReg').innerHTML = u.nickname;
		document.getElementById('useridReg').innerHTML =
			'<a href="./userpage.html?coder=' + u.id + '">' + u.id + '</a>';
	} else {
		// There is no user or account is disabled
		if (u.disabled) {
			document.getElementById('errUserSpecific2').showModal();
		} else {
			document.getElementById('errUserSpecific1').showModal();
		}
	}
}

fetch('/assets/data/user_data.json')
	.then(response => response.json())
	.then(data =>
		checkUser(
			data,
			new URLSearchParams(window.location.search).get('coder')
		)
	)
	.catch(error =>
		console.error('Error at "visitUser.js": Catch error{"' + error + '"}')
	);
