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

function getJoke() {
    const jokeDisplayArea = document.getElementById("jokeDisplayArea");

    accessHTTP
        .get("https://api.chucknorris.io/jokes/random")
        .then(theJoke => {
            jokeDisplayArea.innerHTML = theJoke.value;
        })
        .catch(err => console.log(err));
}

function getWeather() {
    const weatherLocation = document.getElementById("weatherLocation");
    const weatherDescription = document.getElementById("weatherDescription");
    const weatherTemperature = document.getElementById("weatherTemperature");

    accessHTTP
        .get("http://localhost:3000/weather")
        .then(theWeather => {
            weatherLocation.innerHTML = theWeather.name;
            weatherDescription.innerHTML = theWeather.description;
            weatherTemperature.innerHTML = `${theWeather.temperature} °C`;
        })
        .catch(err => console.log(err));
}

getJoke();
getWeather();