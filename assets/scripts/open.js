const hours = new Date().getHours();
let isTheSunAlreadyAwake = (hours > 6 && hours < 20)

// When page loaded if is day time then go to index.html
window.addEventListener('load', function(){
    if(isTheSunAlreadyAwake){
        this.location.assign('./index.html')
    }
})