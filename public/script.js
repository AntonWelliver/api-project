class AccessHTTP {
    constructor() {
        this.status = 0;
    }

    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        this.status = response.status;

        return resData;
    }
}

let accessHTTP = new AccessHTTP();


function getWeather() {
    const weatherLocation = document.getElementById("weatherLocation");
    const weatherDescription = document.getElementById("weatherDescription");
    const weatherTemperature = document.getElementById("weatherTemperature");
    const serverURI = window.location.host;

    accessHTTP
        .get(`http://${serverURI}/weather`)
        .then(theWeather => {
            weatherLocation.innerHTML = theWeather.name;
            weatherDescription.innerHTML = theWeather.description;
            weatherTemperature.innerHTML = `${theWeather.temperature} °C`;
        })
        .catch(err => console.log(err));
}

getWeather();