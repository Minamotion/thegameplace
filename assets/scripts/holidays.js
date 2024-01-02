const holidayCheckTime = new Date()
let holidayWereOn = null
let siteFavicon = document.getElementById('siteFavicon')
let holidayStylesheet = document.getElementById('holiday-custom_stylesheet')
let missingJerry = (siteFavicon == null)

// Thanks "https://www.mathsisfun.com/measure/months.html" and Google for providing the months and days
// Thanks "https://www.w3schools.com/js/js_date_methods.asp" for the "new Date()" thing (also months & weekdays have an offset of -1)
// The site's icon has a name, and it's Jerry, that's why every holiday's png file with Jerry in it has a suffix of "_jerry"


if (holidayCheckTime.getMonth() === 9) {
    // It's halloween!
    holidayWereOn = 'halloween'
    if(!(missingJerry)) {
        siteFavicon.src = '/assets/images/holiday/holiday-halloween_easteregg_jerry.png'
    } else {
        console.error('Error at "holidays.js": ...Where is Jerry?')
    }
    holidayStylesheet.setAttribute('href', '/assets/stylesheets/holiday/holiday-halloween.css')
}

if (holidayCheckTime.getMonth() === 11) {
    // It's christmas!
    holidayWereOn = 'christmas'
    if(!(missingJerry)) {
        siteFavicon.src = '/assets/images/holiday/holiday-christmas_easteregg_jerry.png'
    } else {
        console.error('Error at "holidays.js": Where is Jerry? I thought he liked Christmas')
    }
    holidayStylesheet.setAttribute('href', '/assets/stylesheets/holiday/holiday-christmas.css')
}

if (holidayCheckTime.getMonth() === 2 && holidayCheckTime.getDate() === 30) {
    // It's my birthday!
    holidayWereOn = 'creatorBirthday'
    if(!(missingJerry)) {
        siteFavicon.src = '/assets/images/holiday/holiday-birthday_easteregg_jerry.png'
    } else {
        console.error('Error at "holidays.js": Where is Jerry? I thought I invited him to my birthday party, where is he?')
    }
    holidayStylesheet.setAttribute('href', '/assets/stylesheets/holiday/holiday-creator_birthday.css')
}