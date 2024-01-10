// When page loaded make the search button enabled
window.addEventListener('load', function () {
        const gameslotsubmitsearch = document.getElementById('scrolltogamebutton');
        gameslotsubmitsearch.removeAttribute('disabled')
    }
)

// If the search button is clicked then search for gameslot, if not found then SAY HELLO TO THE ERROR DIALOG!!!
document.getElementById('scrolltogamebutton').addEventListener('click', function () {
        const val = document.getElementById("searchgameslot-input").value;
        elemSpecific = document.getElementById(val);

        if(elemSpecific !== null){
            elemSpecific.scrollIntoView();
        } else {
            document.getElementById("err1").showModal();
            console.error("Error at \"index.html\": Cannot find specific");
        }
    }
)