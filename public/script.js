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
        .get("http://api.openweathermap.org/data/2.5/weather?q=Göteborg,SE&APPID=2244525827f5b74d1d5dbc7bd3cd7474")
        .then(theWeather => {
            let temp = parseInt(Number(theWeather.main.temp)) - 273;
            weatherLocation.innerHTML = theWeather.name;
            weatherDescription.innerHTML = theWeather.weather[0].description;
            weatherTemperature.innerHTML = `${temp} °C`;
        })
        .catch(err => console.log(err));
}

getJoke();
getWeather();