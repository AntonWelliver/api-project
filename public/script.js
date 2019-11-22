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

function getSoccerStats() {
    const soccerStats = document.getElementById("soccerStats");
    const serverURI = window.location.host;

    let leaguePosition = "";
    let teamName = "";
    let playedGames = "";
    let gamesWon = "";
    let gamesDrawn = "";
    let gamesLost = "";
    let goalsFor = "";
    let goalsAgainst = "";
    let goalDifference = "";
    let points = "";
    let output = "";

    accessHTTP
        .get(`http://${serverURI}/soccerStats`)
        .then(theSoccerStats => {
            theSoccerStats.forEach(element => {
                leaguePosition = element.position;
                teamName = element.team.name;
                playedGames = element.playedGames;
                gamesWon = element.won;
                gamesDrawn = element.draw;
                gamesLost = element.lost;
                goalsFor = element.goalsFor;
                goalsAgainst = element.goalsAgainst;
                goalDifference = element.goalDifference;
                points = element.points;

                output += `<tr>
                <td>${leaguePosition}</td>
                <td>${teamName}</td>
                <td>${playedGames}</td> 
                <td>${gamesWon}</td>
                <td>${gamesDrawn}</td>
                <td>${gamesLost}</td>
                <td>${goalsFor}</td>
                <td>${goalsAgainst}</td>
                <td>${goalDifference}</td>
                <td>${points}</td>
                </tr>`;
            });
            soccerStats.innerHTML = output;
        })
        .catch(err => console.log(err));
}

getWeather();
getSoccerStats();