const jerrysaylist=[
    'Nice too meet ya!',
    'This is my official account :D',
    'I\'m inside your wallet',
    'Here is a tip: Watch out for Duolingo',
    'I need help, I think I\'m green but my color is <a href="https://www.google.com/search?q=%2379cea5">#79CEA5</a>',
    '<span title="Don\'t">Did you know that pressing <span style="font-family:monospace;">ALT+F4</span> you can take a screenshot of your screen? Try it out!</span>'
];
function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
let coder = new URLSearchParams(window.location.search).get('coder')
if(coder=='jerry'||coder==100){setTimeout(()=>{document.getElementById('jerrystuff').innerHTML=jerrysaylist[randomInt(0,jerrysaylist.length)];delete coder;},50);}