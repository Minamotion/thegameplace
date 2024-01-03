window.addEventListener('load', function(){
    document.getElementById('modespan').innerHTML = (localStorage.getItem('darkmode') == 'false')?'Light mode':'Dark mode'
})

document.getElementById('modeswitchbutton').addEventListener('click', function(){
    localStorage.setItem('darkmode', (localStorage.getItem('darkmode') == 'false')?'true':'false');
    document.getElementById('modespan').innerHTML = (localStorage.getItem('darkmode') == 'false')?'Light mode':'Dark mode'
})