const apiKey = 'f38eefo48bt62b0f4f4597fdbecfda4d';

document.querySelector('.search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.querySelector('.search-form-input').value;
  getWeatherData(city);
});

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const days = getDailyForecast(data);
      displayWeeklyWeather(days);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function getDailyForecast(data) {
  const dailyData = [];
  for (let i = 0; i < data.list.length; i += 8) { // Every 8th element (3-hour interval data for next days)
    const dayData = data.list[i];
    dailyData.push({
      date: dayData.dt_txt, // Date of forecast
      temp: Math.round(dayData.main.temp),
      description: dayData.weather[0].description,
      icon: dayData.weather[0].icon
    });
  }
  return dailyData;
}

function displayWeeklyWeather(days) {
  const forecastContainer = document.querySelector('.weather-forecast');
  forecastContainer.innerHTML = ''; // Clear previous forecast

  days.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('forecast-day');
    dayElement.innerHTML = `
      <h3>${day.date}</h3>
      <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}" />
      <p>${day.temp}°C</p>
      <p>${day.description}</p>
    `;
    forecastContainer.appendChild(day
