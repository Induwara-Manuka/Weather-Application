window.onload = function() {
    setInterval(function() {
        const date = new Date();
        const displayDate = date.toLocaleDateString();
        const displayTime = date.toLocaleTimeString();

        document.getElementById('date').innerHTML = displayDate;
        document.getElementById('time').innerHTML = displayTime;
    }, 1000); // Update every second (1000 milliseconds)
};



const apiKey = 'cc224e8c5b314ef4b20140041241009';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';
const forecastUrl = 'https://api.weatherapi.com/v1/forecast.json';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');
const forecastContainer = document.getElementById('forecastContainer');

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('colombo');
});

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${forecastUrl}?key=${apiKey}&q=${location}&days=7`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data.forecast.forecastday);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayCurrentWeather(data) {
    locationElement.textContent = data.location.name;
    weatherIconElement.src = data.current.condition.icon;
    temperatureElement.textContent = `${data.current.temp_c}°C`;
    humidityElement.textContent = `${data.current.humidity}%`;
    windSpeedElement.textContent = `${data.current.wind_kph} kph`;
    descriptionElement.textContent = `${data.current.condition.text}`;
}

function displayForecast(forecast) {
    forecastTableBody.innerHTML = '';
    forecast.forEach(day => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(day.date).toLocaleDateString()}</td>
            <td><img src="${day.day.condition.icon}" alt="Weather Icon"></td>
            <td>${day.day.condition.text}</td>
            <td>${day.day.maxtemp_c}°C</td>
            <td>${day.day.mintemp_c}°C</td>
            <td>${day.day.daily_chance_of_rain}%</td>
        `;
        forecastTableBody.appendChild(row);
    });
}









