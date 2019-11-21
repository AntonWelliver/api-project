const express = require('express')
const fetch = require("node-fetch");
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/weather', async (req, res) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q=London,UK&APPID=2244525827f5b74d1d5dbc7bd3cd7474";
    try {
        const response = await fetch(url);
        const theWeather = await response.json();

        if (response.status == 200) {
            let temperature = parseInt(Number(theWeather.main.temp)) - 273;
            let weatherInformation = {
                name: theWeather.name,
                description: theWeather.weather[0].description,
                temperature: temperature
            }
            res.json(weatherInformation);
        } else {
            res.status(response.status).json({ message: err.message });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



app.listen(port, () => console.log(`Server started on port ${port}!`))