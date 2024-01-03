// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" and "https://stackoverflow.com/questions/43642729/calling-a-method-from-another-method-in-the-same-class" for making this possible
class userPref {
    constructor(){
        this.params = new URLSearchParams(window.location.search)
    }

    async run(){
        if (this.params.has('light') && !(this.params.has('dark'))) {
            // We have to return to light mode
            localStorage.setItem('darkmode', 'false'); // Set darkmode to false
            console.log('Log at "x.js": Dark mode disabled')
        }
        if (this.params.has('dark') || ((localStorage.getItem('darkmode') == 'true') ? true : false)) {
            // We are in dark mode
            document.getElementById('darkmode').innerHTML = await fetch("/assets/stylesheets/modes/dark.css").then(e => e.text()); // Setup darkmode
            if ((((localStorage.getItem('darkmode') == 'false') ? true : false))) {
                //darkmode is false
                localStorage.setItem('darkmode', 'false'); // Set darkmode to false
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
            this.run()
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
                } else {
                    alert('Ok.')
                }
            } else {
                alert('Ok.')
            }
        } else {
            alert('Ok.')
        }
    }
}

new userPref().setup()

if (top.location.pathname == "/editpref.html"){
    // We are in settings
    window.addEventListener('load', function(){
        // Pre-load things
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode'))?'Light mode':'Dark mode'
    })

    document.getElementById('modeswitchbutton').addEventListener('click', function(){
        // When this button was clicked then
        localStorage.setItem('darkmode', (localStorage.getItem('darkmode') == 'false')?'true':'false')
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode'))?'Light mode':'Dark mode'
    })

    document.getElementById('clearbutton').addEventListener('dblclick', function(){
        settings.clearAll()
    })
}