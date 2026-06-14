async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=40`;

  try {
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();

    // Group by date — pick one reading per day (around noon)
    const days = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const hour = date.getHours();
      if (!days[dateStr] || Math.abs(hour - 12) < Math.abs(new Date(days[dateStr].dt * 1000).getHours() - 12)) {
        days[dateStr] = item;
      }
    });

    const dayKeys = Object.keys(days).slice(0, 5);
    const forecastContainer = document.getElementById('forecastCards');
    forecastContainer.innerHTML = '';

    dayKeys.forEach(dateStr => {
      const item = days[dateStr];
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const icon = getWeatherIcon(item.weather[0].id, false);
      const maxTemp = Math.round(item.main.temp_max);
      const minTemp = Math.round(item.main.temp_min);
      const desc = item.weather[0].description;

      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <span class="f-day">${dayName}</span>
        <span class="f-date">${dateLabel}</span>
        <span class="f-icon">${icon}</span>
        <span class="f-desc">${desc}</span>
        <span class="f-temp"><span class="f-max">${maxTemp}°</span> <span class="f-min">${minTemp}°</span></span>
      `;
      forecastContainer.appendChild(card);
    });

    document.getElementById('forecastSection').style.display = 'block';

  } catch (err) {
    console.error('Forecast error:', err);
  }
}