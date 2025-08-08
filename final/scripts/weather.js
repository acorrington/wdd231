// weather.js for Roseburg Volunteer Network
export async function getWeather() {
    const lat = 43.2165; // Roseburg, OR
    const lon = -123.3417;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&daily=temperature_2m_max,weathercode&timezone=America/Los_Angeles&temperature_unit=fahrenheit&forecast_days=7`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        console.log('Weather Data:', data);
        const weatherCodeToText = (code) => {
            const codes = {
                0: { description: "Clear sky", day_icon: "https://openweathermap.org/img/wn/01d@2x.png", night_icon: "https://openweathermap.org/img/wn/01n@2x.png" },
                1: { description: "Mainly clear", day_icon: "https://openweathermap.org/img/wn/01d@2x.png", night_icon: "https://openweathermap.org/img/wn/01n@2x.png" },
                2: { description: "Partly cloudy", day_icon: "https://openweathermap.org/img/wn/02d@2x.png", night_icon: "https://openweathermap.org/img/wn/02n@2x.png" },
                3: { description: "Cloudy", day_icon: "https://openweathermap.org/img/wn/03d@2x.png", night_icon: "https://openweathermap.org/img/wn/03n@2x.png" },
                45: { description: "Fog", day_icon: "https://openweathermap.org/img/wn/50d@2x.png", night_icon: "https://openweathermap.org/img/wn/50n@2x.png" },
                48: { description: "Freezing fog", day_icon: "https://openweathermap.org/img/wn/50d@2x.png", night_icon: "https://openweathermap.org/img/wn/50n@2x.png" },
                51: { description: "Light drizzle", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                53: { description: "Drizzle", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                55: { description: "Heavy drizzle", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                56: { description: "Light freezing drizzle", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                57: { description: "Freezing drizzle", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                61: { description: "Light rain", day_icon: "https://openweathermap.org/img/wn/10d@2x.png", night_icon: "https://openweathermap.org/img/wn/10n@2x.png" },
                63: { description: "Rain", day_icon: "https://openweathermap.org/img/wn/10d@2x.png", night_icon: "https://openweathermap.org/img/wn/10n@2x.png" },
                65: { description: "Heavy rain", day_icon: "https://openweathermap.org/img/wn/10d@2x.png", night_icon: "https://openweathermap.org/img/wn/10n@2x.png" },
                66: { description: "Light freezing rain", day_icon: "https://openweathermap.org/img/wn/10d@2x.png", night_icon: "https://openweathermap.org/img/wn/10n@2x.png" },
                67: { description: "Freezing rain", day_icon: "https://openweathermap.org/img/wn/10d@2x.png", night_icon: "https://openweathermap.org/img/wn/10n@2x.png" },
                71: { description: "Light snow", day_icon: "https://openweathermap.org/img/wn/13d@2x.png", night_icon: "https://openweathermap.org/img/wn/13n@2x.png" },
                73: { description: "Snow", day_icon: "https://openweathermap.org/img/wn/13d@2x.png", night_icon: "https://openweathermap.org/img/wn/13n@2x.png" },
                75: { description: "Heavy snow", day_icon: "https://openweathermap.org/img/wn/13d@2x.png", night_icon: "https://openweathermap.org/img/wn/13n@2x.png" },
                77: { description: "Snow grains", day_icon: "https://openweathermap.org/img/wn/13d@2x.png", night_icon: "https://openweathermap.org/img/wn/13n@2x.png" },
                80: { description: "Light rain shower", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                81: { description: "Rain shower", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                82: { description: "Heavy rain shower", day_icon: "https://openweathermap.org/img/wn/09d@2x.png", night_icon: "https://openweathermap.org/img/wn/09n@2x.png" },
                85: { description: "Snow shower", day_icon: "https://openweathermap.org/img/wn/13d@2x.png", night_icon: "https://openweathermap.org/img/wn/13n@2x.png" },
                86: { description: "Heavy snow shower", day_icon: "https://openweathermap.org/img/wn/13d@2x.png", night_icon: "https://openweathermap.org/img/wn/13n@2x.png" },
                95: { description: "Thunderstorm", day_icon: "https://openweathermap.org/img/wn/11d@2x.png", night_icon: "https://openweathermap.org/img/wn/11n@2x.png" },
                96: { description: "Thunderstorm with slight hail", day_icon: "https://openweathermap.org/img/wn/11d@2x.png", night_icon: "https://openweathermap.org/img/wn/11n@2x.png" },
                99: { description: "Thunderstorm with heavy hail", day_icon: "https://openweathermap.org/img/wn/11d@2x.png", night_icon: "https://openweathermap.org/img/wn/11n@2x.png" }
            };
            return codes[code] || 'Unknown';
        };
        return {
            current: {
                temp: data.current.temperature_2m,
                condition: weatherCodeToText(data.current.weathercode),
            },
            forecast: data.daily.time.slice(2, 5).map((time, i) => ({
                date: new Date(time).toLocaleDateString(),
                temp: data.daily.temperature_2m_max[i],
                condition: weatherCodeToText(data.daily.weathercode[i]),
            })),
        };
    } catch (error) {
        console.error('Weather Error:', error);
        return null;
    }
}