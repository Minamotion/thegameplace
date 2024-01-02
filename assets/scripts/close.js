const hours = new Date().getHours();
let isTheMoonAlreadyAwake = !(hours > 6 && hours < 20)

// When page loaded if is night time then go to closed.html
window.addEventListener('load', function(){
    if(isTheMoonAlreadyAwake){
        this.location.assign('./closed.html')
    }
})