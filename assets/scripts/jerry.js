// Get jerry's say list
let jerrysaylist=[
    'Nice too meet ya!',
    'This is my official account :D',
    'I\'m inside your wallet',
    'Here is a tip: Watch out for Duolingo',
    'I need help, I think I\'m green but my color is <a href="https://www.google.com/search?q=%2379cea5">#79CEA5</a>',
    '<span title="Don\'t">Did you know that pressing <span style="font-family:monospace;">ALT+F4</span> you can take a screenshot of your screen? Try it out!</span>'
];
// Get a randomInt function from w3schools.com
function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

// Assign variables
let coder = new URLSearchParams(window.location.search).get('coder')
let s = randomInt(0,((Object.keys(jerrysaylist).length)-1))

// Assign text to jerry's span and get rid of those variables, they're not useful anymore
if(coder=='jerry'||coder==100){setTimeout(()=>{document.getElementById('jerrystuff').innerHTML=jerrysaylist[s];},50);}
setTimeout(()=>{delete coder; delete s; delete jerrysaylist;},100)