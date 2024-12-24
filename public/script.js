document
    .getElementById("weatherForm")
    .addEventListener("submit", async (event) => {
        // will stop next page from loading
        event.preventDefault();

        // getting data from input fields
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;

        try {
            const response = await fetch(
                `/weather?city=${city}&state=${state}`
            );

            const data = await response.json();
            const weatherResults = document.getElementById("weatherResults");

            if (response.ok) {
                weatherResults.innerHTML = `
                    <h2>Weather in ${city}, ${state}</h2>
                    <p>Temperature: ${data.temp}</p>
                    <p>Description: ${data.description}</p>
                    <p>Wind Speed: ${data.windSpeed}</p>
                    <p>Condition: ${data.condition}</p>
                `;
            } else {
                weatherResults.innerHTML = `<p>${data.error}</p>`;
            }
        } catch (error) {
            console.log(`Error fetching weather data: ${error}`);
            document.getElementById(
                "weatherResults"
            ).innerHTML = `<p>Error Fetching Weather Data</p>`;
        }
    });
