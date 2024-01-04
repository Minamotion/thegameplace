// For those who don't know what is this for, this script will run in all html pages (Except for embedded)
// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" and "https://stackoverflow.com/questions/43642729/calling-a-method-from-another-method-in-the-same-class" for making this possible
function pageLocationIs(here){return(top.location.pathname==here)}
class SettingsObj {
    constructor(){this.params = new URLSearchParams(window.location.search)}
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
        if (window.location.protocol !== 'https:') {
            // I want users to have a secure connection so I made this script
            localStorage.clear() // Clear info saved in the http protocol
            setTimeout(() => {
                window.location.assign('https://thegameplace.minamotion.org'+window.location.pathname+window.location.search)
                // After .01 seconds go to the safe location
            }, 10);
        } else {
            this.run()
        }
    }
    setDefault(){
        localStorage.clear() // If there was anything that was useless then erase it
        localStorage.setItem('darkmode', 'false');
        localStorage.setItem('allowinvisible', 'false')
        localStorage.setItem('fun', 'true')
    }
    clearAll(){
        this.setDefault()
        window.location.reload()
    }
}
if(localStorage.length < 1){
    new SettingsObj().setDefault()
}
new SettingsObj().setup()
if (pageLocationIs("/editpref.html")){
    // We are in settings
    window.addEventListener('load', function(){
        // Pre-load settings
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode') == 'true')?'Light mode':'Dark mode'
        document.getElementById('seeinvisiblespan').innerHTML = !(localStorage.getItem('allowinvisible') == 'true')?'Safe mode':'Allowing mode'
        document.getElementById('holidayspan').innerHTML = !(localStorage.getItem('fun') == true)?'No holidays :(':'Holidays! :D'
    })
    document.getElementById('modeswitchbutton').addEventListener('click', function(){
        // When this button is clicked then switch to dark/light mode
        localStorage.setItem('darkmode', (localStorage.getItem('darkmode') == 'false')?'true':'false')
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode') == 'true')?'Light mode':'Dark mode'
    })
    document.getElementById('seeinvisiblebutton').addEventListener('click', function(){
        // When this button is clicked then switch to safe/allowing mode
        // What this means is that it will switch from not seeing invisible games to seeing them
        // It is turned off by default
        localStorage.setItem('allowinvisible', (localStorage.getItem('allowinvisible') == 'false')?'true':'false')
        document.getElementById('seeinvisiblespan').innerHTML = !(localStorage.getItem('allowinvisible') == true)?'Safe mode':'Allowing mode'
    })
    document.getElementById('holidaybutton').addEventListener('dblclick', function(){
        // When this button is clicked then switch to boring/fun mode
        // What this means is that it will switch from celebrating holidays to not doing it
        // Holidays are turned on by default
        localStorage.setItem('fun', (localStorage.getItem('fun') == 'false')?'true':'false')
        document.getElementById('holidayspan').innerHTML = !(localStorage.getItem('fun') == true)?'No holidays :(':'Holidays! :D'
    })
    document.getElementById('clearbutton').addEventListener('dblclick', function(){
        if(confirm('Are you sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your settings, this can\'t be undone!')){
            if(confirm('Are you REALLY sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your settings, this can\'t be undone!')){
                if(confirm('Are you SUPER-MEGA-REALLY sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your settings, this can\'t be undone!')){
                    alert('...as you wish.')
                    new SettingsObj().clearAll()
                } else {
                    alert('Ok.')
                }
            } else {
                alert('Ok.')
            }
        } else {
            alert('Ok.')
        }
    })
}