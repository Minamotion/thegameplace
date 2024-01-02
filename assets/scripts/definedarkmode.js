async function DarkMode() {
    if (new URLSearchParams(window.location.search).has('light') && !(new URLSearchParams(window.location.search).has('dark'))) {
        localStorage['darkmode'] = '{"active": false}'
        console.warn("You have deactivated darkmode (BETA)")
    }

    if (new URLSearchParams(window.location.search).has('dark') || JSON.parse(localStorage['darkmode']).active == true) {
        document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text());
        console.info("You're currently using dark mode")
        localStorage['darkmode'] = '{"active": true}'
    } else {
        console.warn("Use dark mode, Just add the parameter 'dark' to the url")
        console.warn("Once you put the dark parameter you will have darkmode forever (BETA)")
    }
}

DarkMode()