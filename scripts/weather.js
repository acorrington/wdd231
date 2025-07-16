// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75014115733131&lon=6.637416699928242&appid=565cad1219d62964f4b20a11e05ee580&units=imperial';

// Fetch the weather data from the OpenWeatherMap API
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(await response.text());
        }
        const data = await response.json();
        console.log(data); // Log the data to the console for debugging

        displayResults(data);

    } catch (error) {
        console.error(error);
    }
}

// Display the weather data in the HTML elements
function displayResults(data) {
    currentTemp.textContent = `${data.main.temp} &deg;F`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    captionDesc.textContent = data.weather[0].description;
}

// Call the apiFetch function to fetch and display the weather data
apiFetch();
