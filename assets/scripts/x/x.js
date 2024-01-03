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

    clearAll(){
        if(confirm('Are you sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your settings, this can\'t be undone!')){
            if(confirm('Are you REALLY sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your settings, this can\'t be undone!')){
                if(confirm('Are you SUPER-MEGA-REALLY sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your settings, this can\'t be undone!')){
                    alert('...as you wish.')
                    localStorage.clear()
                    localStorage.setItem('darkmode', 'false');
                    window.location.reload()
                }
            }
        }
    }
}

const userPref = new userPref()
userPref.setup()

if (top.location.pathname == "/editpref.html"+top.location.search){
    window.addEventListener('load', function(){
        document.getElementById('modespan').innerHTML = !(userPref.darkmode)?'Light mode':'Dark mode'
    })    
    document.getElementById('modeswitchbutton').addEventListener('click', function(){
        localStorage.setItem('darkmode', (userPref.darkmode == 'false')?'true':'false');
        document.getElementById('modespan').innerHTML = !(userPref.darkmode)?'Light mode':'Dark mode'
    })
    document.getElementById('clearbutton').addEventListener('dblclick', function(){
        userPref.clearAll()
    })
}