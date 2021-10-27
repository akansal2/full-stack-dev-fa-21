(() => {
    // makeAPOD is used to create a APOD node in the following format:
    // <div class="apod">
    //     <small id="apod-date"> 02-21-2021 </small>
    //     <img id="apod-image" width="200px" src="https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg" alt="">
    // </div>
    const makeAPOD = (url, date) => {
        var div = document.createElement("div");
        div.className = "apod";
        var small = document.createElement("small");
        small.id = "apod-date";
        small.innerText = date;
        var img = document.createElement("img");
        img.src = url;
        img.style.width = "200px"
        div.appendChild(small);
        div.appendChild(img);
        return div
    }

    // TODO: Fetch a list of APODs from the database.
    // Here the apods are filled with dummy data.
    const API_KEY = "WRETL0tUJMgJoBQ5Acf12npLmIqjxEyHAuazueRF";

    function randomImage() {
        var start = new Date(2012, 1, 1);
        var end = new Date();
        var newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        var strDate = "" + newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDay();
        var newDate = "https://api.nasa.gov/planetary/apod?date=" + strDate + "&api_key=" + API_KEY;
        return JSON.parse(httpGet(newDate));
        }
    
    var json1 = randomImage();
    var json2 = randomImage();

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    apods = [[json1['hdurl'], json1['date']], [json2['hdurl'], json2['date']]]

    console.log(apods)

    var al = document.getElementById("apod-list");
    for (apod of apods) {
        console.log(apod)
        al.appendChild(makeAPOD(apod[0], apod[1]))
    }
})()