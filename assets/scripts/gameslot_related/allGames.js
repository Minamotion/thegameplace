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

function createGameslot(title, gameslotid, embedRes, coder, coderEmail, invisible, containerId) {
    let curContent = document.getElementById(containerId).innerHTML
    let classes = ""
    if (invisible) {
        classes = "gameslot invisible"
    } else {
        classes = "gameslot"
    }
    document.getElementById(containerId).innerHTML = curContent + "<div class='"+classes+"' style='margin: auto; text-align: center;' id="+gameslotid+"><div class='gamescreen'> <iframe src="+embedRes+" width='450' height='300'></iframe></div><div class=\"center-child\"><div><h1 style='margin-bottom: 0;'><a href='./game.html?gameslotid="+gameslotid+"'>" + title + "</a></h1> <p style='margin-top: 0;word-wrap: break-word;'>" + gameslotid + " | made by <a href=\"/userpage.html?coder="+coder+"\">" + coder + "</a></p> </div></div> <div class=\"center-child\"><div> <button onclick='location.assign(\"mailto:" + coderEmail + "?subject=My opinion about your game \""+title+"\"&body=The gameslotid is "+gameslotid+"%0A%0A- Sent via TheGamePlace\")'>Give opinion</button> </div></div> </div>"
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

    // Search for gameslots
    while (x < Object.keys(json).length) {
        if(json[x].invisible === false && ((localStorage.getItem('allowinvisible') == 'false') ? true : false)) {
            curUser = getUser(userjson, json[x].coderID)
            createGameslot(json[x].title, json[x].gameslotid, json[x].embedRes, curUser.nickname, curUser.email, json[x].invisible, 'gameslotstore')
        }
        x++
    }
}

fetch('/assets/data/gameslot_data.json')
    .then(response => response.json())
    .then(data => loadGameslots(data))
    .catch(error => console.error('Error at "allGames.js": Catch error{"'+error+'"}'));