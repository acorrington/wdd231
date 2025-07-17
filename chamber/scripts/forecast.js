// select HTML elements in the document
const forecastToday = document.querySelector('#forecast-today');
const forecastTomorrow = document.querySelector('#forecast-tomorrow');
const forecastDayAfterTomorrow = document.querySelector('#forecast-day-after-tomorrow');
const forecastTomorrowDay = document.querySelector('#forecast-tomorrow-day');
const forecastDayAfterTomorrowDay = document.querySelector('#forecast-day-after-tomorrow-day');

// Fetch the weather data from the OpenWeatherMap API
async function apiFetch() {
    // Define the latitude and longitude for Roseburg, Oregon
    const lat = 43.22546589268887;
    const lon = -123.38266828945325;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=565cad1219d62964f4b20a11e05ee580&units=imperial`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(await response.text());
        }
        const data = await response.json();
        console.log(data); // Log the data to the console for debugging

        displayForecast(data);

    } catch (error) {
        console.error(error);
    }
}

// Display the weather data in the HTML elements
function displayForecast(data) {

    // Find the forecast for today, tomorrow, and the day after tomorrow
    const now = new Date();
    const today = now.getDate();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).getDate();
    const dayAfterTomorrow = new Date(now.getTime() + 48 * 60 * 60 * 1000).getDate();

    function getForecastForDay(day) {
        // Check if the date matches the day and the time is between 2 PM and 5 PM
        return data.list.find(item => {
            const itemDate = new Date(item.dt * 1000);            
            return itemDate.getDate() === day && itemDate.getHours() >= 14 && itemDate.getHours() <= 17;
        });
    }

    // Get the forecast data for today, tomorrow, and the day after tomorrow
    const forecastTodayData = getForecastForDay(today);
    forecastToday.textContent = getForecastForDay(today)
        ? `${forecastTodayData.weather[0].description}, Temp: ${forecastTodayData.main.temp} °F`
        : 'No data';

    const forecastTomorrowData = getForecastForDay(tomorrow);
    forecastTomorrow.textContent = forecastTomorrowData
        ? `${forecastTomorrowData.weather[0].description}, Temp: ${forecastTomorrowData.main.temp} °F`
        : 'No data';

    const forecastDayAfterTomorrowData = getForecastForDay(dayAfterTomorrow);
    forecastDayAfterTomorrow.textContent = forecastDayAfterTomorrowData
        ? `${forecastDayAfterTomorrowData.weather[0].description}, Temp: ${forecastDayAfterTomorrowData.main.temp} °F`
        : 'No data';
    
    // Set the day names for tomorrow and the day after tomorrow
    forecastTomorrowDay.textContent = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    forecastDayAfterTomorrowDay.textContent = new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    }

// Call the apiFetch function to fetch and display the weather data
apiFetch();