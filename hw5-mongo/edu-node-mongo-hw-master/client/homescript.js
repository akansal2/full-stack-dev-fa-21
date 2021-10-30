console.log("script connected.")
// var favs = require('fav')


var heart_status = 0 // 0 is empty and 1 is filled.

const API_KEY = "WRETL0tUJMgJoBQ5Acf12npLmIqjxEyHAuazueRF";

function todayImage() {
    var newDate = "https://api.nasa.gov/planetary/apod?&api_key=" + API_KEY;
    return JSON.parse(httpGet(newDate));
}

function randomImage() {
    var start = new Date(2016, 1, 1);
    var end = new Date();
    var newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    var strDate = "" + newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDay();
    var newDate = "https://api.nasa.gov/planetary/apod?date=" + strDate + "&api_key=" + API_KEY;
    return JSON.parse(httpGet(newDate));
    }


var today = todayImage();

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var favs = []

document.getElementById("apod-date").innerHTML = today['date'];
document.getElementById("apod-title").innerHTML = today['title'];
document.getElementById("apod-image").src = today['hdurl'];
document.getElementById("apod-p").innerHTML = today['explanation'];

document.getElementById("heart-button").addEventListener("click", () => {
    let heart = document.getElementById("heart-button");
    if (heart_status == 0) {
        heart.src = "static/heart-filled.png"
        heart_status = 1
        // favs.append({"date": today['date'], 'title': today['title'], 'explanation': today['explanation'], 'title': today['title']})
        const newAdd = {
            "date": today['date'],
            "title": today['title'],
            "image": today['hdurl'],
            "explanation": today['explanation']
        }
        fetch("http://localhost:8080/api/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAdd)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });
        // TODO: update the database and mark this image as a favorite image.
    } else {
        heart_status = 0
        heart.src = "static/heart.png"
        fetch("http://localhost:8080/api/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAdd)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });
        // TODO: update the database and un-mark this image as a favorite image.
    }
})

document.getElementById("next-button").addEventListener("click", () => {
    document.getElementById("heart-button").src = "static/heart.png";
    heart_status = 0
    today = randomImage();
    document.getElementById("apod-date").innerHTML = today['date'];
    document.getElementById("apod-title").innerHTML = today['title'];
    document.getElementById("apod-image").src = today['hdurl'];
    document.getElementById("apod-p").innerHTML = today['explanation'];

    // TODO: Get the image url, title, description, and date from the database using Fetch.
    // you can use let date = document.getElementById("apod-date"); to change the date.
})