// For those who don't know what is this for, this script will run in all html pages (Except for embedded)
// Thanks "https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable" and "https://stackoverflow.com/questions/43642729/calling-a-method-from-another-method-in-the-same-class" for making this possible
function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function pageLocationIs(here){return(top.location.pathname==here)}
class xObj {
    constructor(){
        this.params = new URLSearchParams(window.location.search)
        this.urlCanClose = ["/404.html","/newpage.html", "/index.html", "/game.html", "/", "", "/userpage.html"]
    }
    async run(){
        let cantClose = true
            this.urlCanClose.forEach(element => {
                if(pageLocationIs(element)){
                    cantClose = false
                }
            });
        if(!(cantClose)){
            let isTheMoonAlreadyAwake = !(new Date().getHours() > 6 && new Date().getHours() < 20)
            if(isTheMoonAlreadyAwake){
                top.location.assign('/closed.html')
            }
        }
        if (this.params.has('light') && !(this.params.has('dark'))) {
            // We have to return to light mode
            localStorage.setItem('darkmode', 'false'); // Set darkmode to false
            console.log('Log at "x.js": Dark mode disabled')
        }
        if (this.params.has('dark') || ((localStorage.getItem('darkmode') == 'true') ? true : false)) {
            // We are in dark mode
            document.getElementById('darkmode').setAttribute('href',"/assets/stylesheets/modes/dark.css") // Setup darkmode
            if ((((localStorage.getItem('darkmode') == 'false')?true:false))) {
                //darkmode is false
                localStorage.setItem('darkmode', 'false'); // Set darkmode to false
                console.log('Log at "x.js": Dark mode enabled')
            }
        }
    }
    setDefault(){
        localStorage.setItem('darkmode', 'false');
        localStorage.setItem('allowinvisible', 'false')
        localStorage.setItem('fun', 'true')
        localStorage.setItem('randomnum', '0')
    }
    clearAll(){
        sessionStorage.clear() // If there was anything that was useless then erase it
        localStorage.clear() // If there was anything that was useless then erase it
        this.setDefault()
        window.location.reload()
    }
}
if(localStorage.length < 1){
    new xObj().setDefault()
}
new xObj().run()
if (pageLocationIs("/editpref.html")){
    // We are in settings
    window.addEventListener('load', function(){
        // Pre-load settings
        document.getElementById('modespan').innerHTML = !(localStorage.getItem('darkmode') == 'true')?'Light mode':'Dark mode'
        document.getElementById('seeinvisiblespan').innerHTML = !(localStorage.getItem('allowinvisible') == 'true')?'Safe mode':'Allowing mode'
        document.getElementById('holidayspan').innerHTML = !(localStorage.getItem('fun') == 'true')?'Grinch mode':'Holiday mode'
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
        document.getElementById('seeinvisiblespan').innerHTML = !(localStorage.getItem('allowinvisible') == 'true')?'Safe mode':'Allowing mode'
    })
    document.getElementById('holidaybutton').addEventListener('dblclick', function(){
        // When this button is clicked then switch to boring/fun mode
        // What this means is that it will switch from celebrating holidays to not doing it
        // Holidays are turned on by default unless you're the Grinch
        localStorage.setItem('fun', (localStorage.getItem('fun') == 'false')?'true':'false')
        document.getElementById('holidayspan').innerHTML = !(localStorage.getItem('fun') == 'true')?'Grinch mode':'Holiday mode'
    })
    document.getElementById('clearbutton').addEventListener('dblclick', function(){
        if(confirm('Are you sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your data, this can\'t be undone!')){
            if(confirm('Are you REALLY sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your data, this can\'t be undone!')){
                if(confirm('Are you SUPER-MEGA-REALLY sure about this? Remember: This is in danger zone for a reason, and its because it\'ll erase all of your data, this can\'t be undone!')){
                    alert('...as you wish.')
                    new xObj().clearAll()
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