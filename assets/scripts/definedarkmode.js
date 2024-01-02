// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" for making this possible

async function DarkMode() {
    if (new URLSearchParams(window.location.search).has('light') && !(new URLSearchParams(window.location.search).has('dark'))) {
        localStorage.setItem('darkmode', 'false');
        console.warn("You have deactivated darkmode");
    }

    if (new URLSearchParams(window.location.search).has('dark') || localStorage.getItem('darkmode') == "true") {
        document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text());
        console.info("You're currently using dark mode")
        console.info("to deactivate darkmode use the parameter light and remove the dark parameter")
        console.info("or you can just run \"localStorage.setItem('darkmode', 'false')\"")
        if (!(localStorage.getItem('darkmode') == "true")) {
            localStorage.setItem('darkmode', 'true')
        }
    } else {
        console.warn("Use dark mode, Just add the parameter 'dark' to the url")
        console.warn("Once you put the dark parameter you will have darkmode forever")
    }
}

DarkMode()