// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" for making this possible
if (this.location.protocol !== 'https:') {
    // I want users to have a secure connection so I made this script
    localStorage.clear() // Clear info saved in the http protocol
    setTimeout(() => {
        this.location.assign('https://thegameplace.minamotion.org'+this.location.pathname)
        // After .05 seconds go to the safe location
    }, 50);
}

async function DarkMode() {
    if (new URLSearchParams(window.location.search).has('light') && !(new URLSearchParams(window.location.search).has('dark'))) {
        // We have to return to light mode
        localStorage.setItem('darkmode', 'false'); // Set darkmode to false
        console.log("You have deactivated darkmode"); // Log to console
        new URLSearchParams(window.location.search).delete('light') // Delete the parameter
    }

    if (new URLSearchParams(window.location.search).has('dark') || localStorage.getItem('darkmode') == "true") {
        // We are in dark mode
        document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text()); // Setup darkmode

        //Console things
        console.info("You're currently using dark mode")
        console.info("to deactivate darkmode use the parameter light and remove the dark parameter")
        console.info("or you can just run \"localStorage.setItem('darkmode', 'false')\"")

        if (!(localStorage.getItem('darkmode') == "true")) {
            //darkmode is false
            localStorage.setItem('darkmode', 'true') //darkmode was false
        }
        new URLSearchParams(window.location.search).delete('dark') // Delete the parameter
    } else {
        // We are not in dark mode, so we do nothing, just do console stuff
        console.info("Use dark mode, Just add the parameter 'dark' to the url")
        console.info("Once you put the dark parameter you will have darkmode forever")
    }
}

DarkMode() //Trigger the function