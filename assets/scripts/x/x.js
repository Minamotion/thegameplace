// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" and "https://stackoverflow.com/questions/43642729/calling-a-method-from-another-method-in-the-same-class" for making this possible
class userPref {
    constructor(){
        this.darkmode = (localStorage.getItem('darkmode') == 'true') ? true : false // If true then true else false
        this.params = new URLSearchParams(window.location.search)
    }

    runextrasafe(){
        if (top.location.protocol !== 'https:') {
            // I want users to have a secure connection so I made this script
            localStorage.clear() // Clear info saved in the http protocol
            setTimeout(() => {
                top.location.assign('https://thegameplace.minamotion.org'+this.location.pathname)
                // After .01 seconds go to the safe location
            }, 10);
        }
    }

    async rundarkmode(){
        if (this.params.has('light') && !(this.params.has('dark'))) {
            // We have to return to light mode
            localStorage.setItem('darkmode', 'false'); // Set darkmode to false
            this.darkmode = false
        }
    
        if (this.params.has('dark') || this.darkmode) {
            // We are in dark mode
            document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text()); // Setup darkmode
    
            if (!(this.darkmode)) {
                //darkmode is false
                localStorage.setItem('darkmode', 'true') //darkmode was false
                this.darkmode = true
            }
        }
    }

    setup(){
        // Run all of the functions!
        this.runextrasafe()
        this.rundarkmode()
    }
}

new userPref().setup()