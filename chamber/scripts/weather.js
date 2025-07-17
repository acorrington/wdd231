// select HTML elements in the document
const weatherIcon = document.querySelector('#weather-icon');
const weatherTemp = document.querySelector('#weather-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherHigh = document.querySelector('#weather-high');
const weatherLow = document.querySelector('#weather-low');
const weatherHumidity = document.querySelector('#weather-humidity');
const weatherSunrise = document.querySelector('#weather-sunrise');
const weatherSunset = document.querySelector('#weather-sunset');

// Fetch the weather data from the OpenWeatherMap API
async function apiFetch() {
    // Define the latitude and longitude for Roseburg, Oregon
    const lat = 43.22546589268887;
    const lon = -123.38266828945325;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=565cad1219d62964f4b20a11e05ee580&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(await response.text());
        }
        const data = await response.json();
        console.log(data); // Log the data to the console for debugging

        displayWeather(data);

    } catch (error) {
        console.error(error);
    }
}

// Display the weather data in the HTML elements
function displayWeather(data) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDesc.textContent = data.weather[0].description;
    weatherTemp.textContent = `${data.main.temp} °F`;
    weatherHigh.textContent = `${data.main.temp_max} °F`;
    weatherLow.textContent = `${data.main.temp_min} °F`;
    weatherHumidity.textContent = `${data.main.humidity} %`;
    weatherSunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    weatherSunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

// Call the apiFetch function to fetch and display the weather data
apiFetch();