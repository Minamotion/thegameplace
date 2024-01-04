function getUser(json, userSearch) {
    // Define variables
    let i = 0
    let isId = !(isNaN(userSearch))

    // Go through all of the json and find user then return their data
    while (i < Object.keys(json).length) {
        switch (isId) {
            case false:
                if (json[i].nickname === userSearch) {
                    return json[i]
                }
                break;
            default:
                if (json[i].id === userSearch) {
                    return json[i]
                }
                break;
        }
        i++
    }
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
            // Proceed with setting up the game.
            document.getElementById('gametitle').innerHTML = json[x].title
            document.getElementById('gamedetails').innerHTML = json[x].gameslotid+" | made by <a href='./userpage.html?coder="+curUser.id+"'>"+curUser.nickname+"</a>"+(json[x].invisible)?' | Danger':' | Safe'
            document.getElementById('game').setAttribute('src', json[x].embedRes)
            document.getElementById('gamegiveopinion').setAttribute('onclick', "location.assign('mailto:"+curUser.email+"?subject=My opinion about your game \""+json[x].title+"\"&body=The gameslotid is "+json[x].gameslotid+"%0A%0A- Sent via TheGamePlace\"")
            if(json[x].desc !== null || json[x].desc !== ""){
                document.getElementById('gamedesc').innerText = json[x].desc
            }
            if(json[x].invisible || curUser.role < 0){
                console.warn('This game is invisible or it\'s creator is an onwatch user, please be careful')
            } else {
                console.info('This game is safe to play or it\'s creator isn\'t a creep')
            }
            document.title = "TheGamePlace - "+json[x].title
            found = true
            // Break the loop
            break;
        }
        x++
    }

    // If cannot find wanted game then
    if(!found) {
        // Create a gameslot with an error on it
        document.getElementById('gametitle').innerHTML = "Error"
        document.getElementById('gamedetails').innerHTML = "Something happened"
        document.getElementById('game').setAttribute('src', "/assets/embed/error.html?errtxt=CANNOT%20FIND%20UNEXISTENT&errcode=CASE__SEARCH_FOR_NULL_")
        document.getElementById('gamedesc').innerText = "This game has failed to load, check the console for more info"
        document.title = "TheGamePlace - Error"
        console.error("Error at \"specificGame.js\": Gameslot with id of "+gsid+" was proved of not existing (Like zombies... for now)")
    }
}

fetch('/assets/data/gameslot_data.json')
    .then(response => response.json())
    .then(data => loadGameslots(data))
    .catch(error => console.error('Error at "specificGame.js": Catch error{"'+error+'"}'));