// main.js for Roseburg Volunteer Network
import { getFeaturedEvent } from './fetch.js';
import { getWeather } from './weather.js';

async function displayFeaturedEvent() {
    const container = document.querySelector('#featured-event-content');
    if (!container) {
        return;
    }

    const event = await getFeaturedEvent();
    if (event) {
        container.innerHTML = `
      <img src="images/events/${event.image}" alt="${event.title}" loading="lazy">
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('en-US')} ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.impact}</p>
    `;
    } else {
        container.innerHTML = '<p>No featured event available.</p>';
    }
}

async function displayWeather() {
    const container = document.querySelector('#weather-content');
    if (!container) {
        return;
    }

    const weather = await getWeather();
    if (weather) {
        container.innerHTML = `
      <h4>Current Weather</h4>
      <div class="weather-card">
      <img src="${getCWeatherIcon(weather.current.condition)}" alt="${weather.current.condition.description}" loading="lazy">
      <p>${weather.current.temp}°F, ${weather.current.condition.description}</p>
      </div>
      <h4>3-Day Forecast</h4>
      ${weather.forecast.map(day =>
            `<div class="weather-card"><img src="${getCWeatherIcon(day.condition)}" alt="${day.condition.description}" loading="lazy"><p>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}: ${day.temp}°F, ${day.condition.description}</p></div>`
         ).join('')}
    `;
    } else {
        container.innerHTML = '<p>Weather data unavailable.</p>';
    }
}

function getCWeatherIcon(condition) {
    // check if its day or night and return the correct weather icon
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? condition.day_icon : condition.night_icon;
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Load data on page load
document.addEventListener('DOMContentLoaded', async () => {
    await displayFeaturedEvent();
    await displayWeather();
    const savedVisit = localStorage.getItem('lastVisit');
    if (savedVisit) {
        const visit = document.querySelector('.last-visit');
        const lastVisit = new Date(savedVisit).toLocaleDateString();
        visit.textContent = `Welcome back! Your last visit was on ${lastVisit}.`;
    }
    localStorage.setItem('lastVisit', new Date().toISOString());
});