require("dotenv").config();
const express = require("express");

const PORT = 3000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const state = req.query.state;
    const country = "US";
    const limit = 1;

    try {
        const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${WEATHER_API_KEY}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        if (!geocodingData || geocodingData.length === 0) {
            return res.status(404).json({ error: "Location Not Found" });
        }

        const lat = geocodingData[0].lat;
        const lon = geocodingData[0].lon;

        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temp = weatherData.list[0].main.temp;
        const description = weatherData.list[0].weather[0].description;
        const windSpeed = weatherData.list[0].wind.speed;
        const condition = weatherData.list[0].weather[0].main;

        return res.json({
            temp,
            description,
            windSpeed,
            condition,
        });
    } catch (error) {
        console.log("Error Fetching data");
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
