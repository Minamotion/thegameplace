async function DarkMode() {
    if (localStorage.getItem('darkmode') == undefined) {
        localStorage.setItem('darkmode', '{"active": false}')
    }
    if (new URLSearchParams(window.location.search).has('light') && !(new URLSearchParams(window.location.search).has('dark'))) {
        localStorage.setItem('darkmode', '{"active": false}');
        console.warn("You have deactivated darkmode (BETA)");
    }
    if (new URLSearchParams(window.location.search).has('dark') || JSON.parse(localStorage.getItem('darkmode')).active) {
        document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text());
        console.info("You're currently using dark mode")
        console.info("to deactivate darkmode use the parameter light and remove the dark parameter")
        console.info("or you can just run \"localStorage.setItem('darkmode', '{\"active\": true}')\"")
        if (!(JSON.parse(localStorage.getItem('darkmode')).active)) {
            localStorage.setItem('darkmode', '{"active": true}')
        }
    } else {
        console.warn("Use dark mode, Just add the parameter 'dark' to the url")
        console.warn("Once you put the dark parameter you will have darkmode forever (BETA)")
    }
}

DarkMode()