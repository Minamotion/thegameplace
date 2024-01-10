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

function loadGameslot(title, gsid, url, uid, uname, gsdesc, unsafe, email){
    document.getElementById('gametitle').innerHTML = title
    document.getElementById('gamedetails').innerHTML = gsid+" | made by <a href='/userpage.html?coder="+uid+"'>"+uname+"</a>"+(unsafe)?' | Danger':' | Safe'
    document.getElementById('game').setAttribute('src', url)
    document.getElementById('gamegiveopinion').setAttribute('onclick', "location.assign('mailto:"+email+"?subject=My opinion about your game \""+title+"\"&body=The gameslotid is "+gsid+"%0A%0A- Sent via TheGamePlace\"")
    if(gsdesc !== null || gsdesc !== ""){
        document.getElementById('gamedesc').innerText = gsdesc
    }
    document.title = "TheGamePlace - "+title
}

function loadGSError(title, details, url, desc, pagetitle){
    document.getElementById('gametitle').innerHTML = title
    document.getElementById('gamedetails').innerHTML = details
    document.getElementById('game').setAttribute('src', url)
    document.getElementById('gamedesc').innerText = desc
    document.title = "TheGamePlace - "+pagetitle
}

async function loadGameslots(json) {
    // Create variables
    let x = 0
    let userjson = {}
    await fetch('/assets/data/user_data.json')
        .then(response => response.json())
        .then(data => userjson = data)
        .catch(error => console.error('Error at "allGames.js": Catch error{"'+error+'"}'))
    let curUser = null
    let found = false
    let gsid = new URLSearchParams(window.location.search).get('gameslotid')
    
    // Search for gameslot
    while (x < Object.keys(json).length) {
        if (json[x].gameslotid == gsid) {
            curUser = getUser(userjson, json[x].coderID)
            if(json[x].invisible || curUser.role < 0){
                if(localStorage.getItem('allowinvisible') == 'true'){
                    console.warn('This game is invisible or it\'s creator is an onwatch user, please be careful')
                    // Proceed with setting up the game.
                    loadGameslot(json[x].title, json[x].gameslotid, json[x].embedRes, curUser.id, curUser.nickname, json[x].desc, json[x].invisible, curUser.email)
                    found = true
                } else {
                    // Create a gameslot with an error on it
                    loadGSError('Error', "Resource blocked intentionally", "/assets/embed/error.html?errtxt=RESOURCE%20FOUND%20BUT%20BLOCKED%20BY%20SECURITY%20REASONS&errcode=CASE__BLOCKED_RESOURCE_FOUND_", "This game was blocked by Safe mode", "Blocked")
                    console.error("Error at \"specificGame.js\": JSON Resource "+gsid+" was blocked by intentional website design")
                    found = true
                }
            } else {
                console.info('This game is safe to play or it\'s creator isn\'t a creep')
                loadGameslot(json[x].title, json[x].gameslotid, json[x].embedRes, curUser.id, curUser.nickname, json[x].desc, json[x].invisible, curUser.email)
                found = true
            }
            // Break the loop
            break;
        }
        x++
    }
    // If cannot find wanted game then
    if(!found) {
        // Create a gameslot with an error on it
        loadGSError('Error', "Resource responded with 404", "/assets/embed/error.html?errtxt=CANNOT%20FIND%20UNEXISTENT&errcode=CASE__SEARCH_FOR_NULL_", "This game has failed to load, check the console for more info", "Error")
        console.error("Error at \"specificGame.js\": Gameslot with id of "+gsid+" was proved of not existing (Like zombies... for now)")
    }
}

fetch('/assets/data/gameslot_data.json')
    .then(response => response.json())
    .then(data => loadGameslots(data))
    .catch(error => console.error('Error at "specificGame.js": Catch error{"'+error+'"}'));