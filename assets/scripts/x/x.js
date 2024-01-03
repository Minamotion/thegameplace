// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" and "https://stackoverflow.com/questions/43642729/calling-a-method-from-another-method-in-the-same-class" for making this possible
class userPref {
    constructor(){
        this.darkmode = (localStorage.getItem('darkmode') == 'true') ? true : false // If true then true else false
        this.params = new URLSearchParams(window.location.search)
    }

    async rundarkmode(){
        if (this.params.has('light') && !(this.params.has('dark'))) {
            // We have to return to light mode
            localStorage.setItem('darkmode', 'false'); // Set darkmode to false
            this.darkmode = false
            console.log('Log at "x.js": Dark mode disabled')
        }
    
        if (this.params.has('dark') || this.darkmode) {
            // We are in dark mode
            document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text()); // Setup darkmode
            if (!(this.darkmode)) {
                //darkmode is false
                this.set('darkmode', true) //darkmode was false
                console.log('Log at "x.js": Dark mode enabled')
            }
        }
    }

    setup(){
        // Run all of the functions!
        if (top.location.protocol !== 'https:') {
            // I want users to have a secure connection so I made this script
            localStorage.clear() // Clear info saved in the http protocol
            setTimeout(() => {
                top.location.assign('https://thegameplace.minamotion.org'+this.location.pathname)
                // After .01 seconds go to the safe location
            }, 10);
        } else {
            this.rundarkmode()
        }
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

    set(setting, value){
        switch (setting) {
            case 'darkmode':
                if(value == true || value == false || value == 'true' || value == 'false'){
                    localStorage.setItem('darkmode', toString(value))
                    this.darkmode = value
                } else {
                    console.error('Error at "x.js": Variable "'+setting+'" cannot be set to "'+value+'" because it is not a boolean')
                }
                break;
            default:
                console.error('Error at "x.js": Variable "'+setting+'" cannot be set to "'+value+'" through this function')
                break;
        }
    }
}

const settings = new userPref()
settings.setup()

if (top.location.pathname == "/editpref.html"){
    // We are in settings
    window.addEventListener('load', function(){
        // Pre-load things
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode'))?'Light mode':'Dark mode'
    })

    document.getElementById('modeswitchbutton').addEventListener('click', function(){
        // When this button was clicked then
        settings.set('darkmode', (localStorage.getItem('darkmode') == 'false')?true:false)
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode'))?'Light mode':'Dark mode'
    })

    document.getElementById('clearbutton').addEventListener('dblclick', function(){
        settings.clearAll()
    })
}