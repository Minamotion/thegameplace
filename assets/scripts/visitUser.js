function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
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
	// No user was found so
	return null
}
function checkUser(json, user) {
	if (user !== null) {
		if(!user.disabled){
			// If not disabled or missing then:
			if (user.desc !== null) {
				// If there is a description then: set it to userdescReg
				document.getElementById('userdescReg').innerHTML = user.desc.replace('\n','<br>');
				let jerrysaylist=[
					'I don\'t accept emails', // That's a fact
					'This is my official account :D',
					'I\'m inside your wallet',
					'Here is a tip: Watch out for Duolingo',
					'I need help, I think I\'m green but my color is <a href="https://www.google.com/search?q=%2379cea5">#79CEA5</a>', // That's another fact
					'<span title="Don\'t">Did you know that pressing <span style="font-family:monospace;">ALT+F4</span> you can take a screenshot of your screen? Try it out!</span>', // D O  N   '    T
					'and I\'m not a PS5\'s controller',
					'Fun fact: If you say you\'re a sane person and still use <span style="text-decoration-line:line-through;" title="I don\'t want to get cancelled by dumb things">Twitter</span> X nobody will believe you', // Bro stop shooting facts!
					'Now you wonder, how does this text change randomly every time I reload this page? Well my friend, the answer is in the <span title="Especially in the \'visitUser\' javascript file :|">source code!</span>', // I SAID STOP SHOOTING FACTS!!!!
					'My creator is a random person, posting random content for random people' // THAT'S MY LINE JERRY!!!!
				];
				if(user.id==100&&user.role==2){ // You're paying a visit to Jerry!
					while(document.getElementById('jerrystuff')==null){/** If jerry doesn't have this span, it will lag*/}
					setTimeout(()=>{
						// To make sure that the span is there, wait 10 miliseconds before doing this
						document.getElementById('jerrystuff').innerHTML=jerrysaylist[randomInt(0,((Object.keys(jerrysaylist).length)-1))]
					},10)
				}
			}
			switch (user.role) {
				// How this works
				// Positive value = Normal or Good
				// Negative value = Bad
				case 3:
					// Only the real Me can have this role
					document.getElementById('userroleReg').innerHTML = 'Creator';
					document.getElementById('userroleReg').setAttribute('style', 'color: #0000ff; margin: 10;');
					break;
				case 2:
					// Only the real Jerry (The logo of this website) can have this role
					document.getElementById('userroleReg').innerHTML = 'Jerry';
					document.getElementById('userroleReg').setAttribute('style', 'color: #accc5c; margin: 10;');
					break;
				case 1:
					// Only website administrators who have registered can have this role
					document.getElementById('userroleReg').innerHTML = 'Administrator';
					document.getElementById('userroleReg').setAttribute('style', 'color: #accc5c; margin: 10;');
					break;
				case 0:
					// This role is applied once the user makes an interaction (Like submitting games!)
					document.getElementById('userroleReg').innerHTML = 'Normal user';
					document.getElementById('userroleReg').setAttribute('style', 'color: #42adeb; margin: 10;');
					break;
				case -1:
					// This role is applied when a user is suspect of breaking the rules
					switch (holidayWereOn) {
						// We receive "holidayWereOn" from the holidays.js (If it is embedded)
						case 'christmas':
							// Santa won't give this user what he wants!
							document.getElementById('userroleReg').innerHTML = 'Naughty user';
							document.getElementById('userroleReg').setAttribute('style','color: #9f0000; margin: 10;');
							break;
						default:
							// The FBI is watching you!
							document.getElementById('userroleReg').innerHTML = 'Onwatch user';
							document.getElementById('userroleReg').setAttribute('style','color: #ff0000; margin: 10;');
							break;
					}
					break;
				case -2:
					// This role is applied when a user was onwatch (Starts to have good behavior, will be removed if it is comfirmed that user is sorry of what he did)
					document.getElementById('userroleReg').innerHTML = 'Still untrusted user';
					document.getElementById('userroleReg').setAttribute('style', 'color: #ffff00; margin: 10;');
					break;
				case -3:
					// Only the fakers can have this role
					document.getElementById('userroleReg').innerHTML = 'FAKER';
					document.getElementById('userroleReg').setAttribute('style', 'color: #ff0000; margin: 10;');
					break;
				default:
					// If no role was set, the user never submitted a game
					document.getElementById('userroleReg').innerHTML = 'Unset';
					document.getElementById('userroleReg').setAttribute('style', 'color: #353535; margin: 10;');
					break;
			}
			document.getElementById('useremailReg').setAttribute('href', 'mailto:' + user.email);
			document.getElementById('usericoReg').setAttribute('src', '/assets/images/users/' + user.id + '.png');
			localStorage.setItem('randomnum', randomInt(1,(holidayWereOn == 'aprilfools')?2:4))
			switch(localStorage.getItem('randomnum')){
            	case '1': // String because i cant get the number and i'm lazy to do it
                	// Replace pfp with random images
                	document.getElementById('usericoReg').setAttribute('src','/assets/images/random/'+randomInt(1,5)+'.png')
                	break;
            	default:
					// Do nothing
                	break;
        	}
			document.title = 'TheGamePlace - ' + user.nickname;
			document.getElementById('usernameReg').innerHTML=user.nickname;
			document.getElementById('useridReg').innerHTML='<a href="/userpage.html?coder='+user.id+'">'+user.id+'</a>';
		} else {
			// User is disabled (not physically nor mentally)
			console.error('Error at "visitUser.js": User is disabled (not physically nor mentally)')
			document.getElementById('errUserSpecific2').showModal();
		}
	} else {
		// User doesn't exist
		console.error('Error at "visitUser.js": User doesn\'t exist')
		document.getElementById('errUserSpecific1').showModal();
	}
}
fetch('/assets/data/user_data.json')
	.then(response=>response.json())
	.then(data=>{
		checkUser(data,getUser(data, new URLSearchParams(window.location.search).get('coder')))
	})
	.catch(error=>console.error('Error at "visitUser.js": Catch error{"'+error+'"}'));