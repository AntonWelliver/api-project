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
            console.log(theJoke.value);
            jokeDisplayArea.innerHTML = theJoke.value;
        })
        .catch(err => console.log(err));
}

getJoke();