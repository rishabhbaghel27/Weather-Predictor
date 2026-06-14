const API_KEY = '3accb3cd9a7ccf651efce1201f731a62';
// Full list: https://openweathermap.org/weather-conditions
function getWeatherTheme(weatherId, temp, isNight) {
  if (isNight) return 'night';
  if (weatherId >= 200 && weatherId <= 232) return 'stormy';   // Thunderstorm
  if (weatherId >= 300 && weatherId <= 321) return 'rainy';    // Drizzle
  if (weatherId >= 500 && weatherId <= 531) return 'rainy';    // Rain
  if (weatherId >= 600 && weatherId <= 622) return 'snowy';    // Snow
  if (weatherId >= 700 && weatherId <= 781) return 'foggy';    // Fog/Mist/Haze
  if (weatherId === 800) {
    if (temp >= 38) return 'hot';
    return 'sunny';
  }
  if (weatherId >= 801 && weatherId <= 804) return 'cloudy';
  return 'default';
}

// Weather condition to emoji icon
function getWeatherIcon(weatherId, isNight) {
  if (isNight) return '🌙';
  if (weatherId >= 200 && weatherId <= 232) return '⛈';
  if (weatherId >= 300 && weatherId <= 321) return '🌦';
  if (weatherId >= 500 && weatherId <= 531) return '🌧';
  if (weatherId >= 600 && weatherId <= 622) return '❄️';
  if (weatherId >= 700 && weatherId <= 781) return '🌫';
  if (weatherId === 800) return '☀️';
  if (weatherId === 801) return '🌤';
  if (weatherId === 802) return '⛅';
  if (weatherId >= 803) return '☁️';
  return '🌡';
}

// Apply animated background based on theme
function applyBackground(theme) {
  const body = document.body;
  const anim = document.getElementById('bgAnimation');

  // Remove all previous weather classes
  const weatherClasses = [
  'weather-default',
  'weather-hot',
  'weather-sunny',
  'weather-cloudy',
  'weather-rainy',
  'weather-stormy',
  'weather-snowy',
  'weather-foggy',
  'weather-night'
];

body.classList.remove(...weatherClasses);
body.classList.add('weather-' + theme);
  anim.innerHTML = '';

  if (theme === 'rainy') {
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.height = (Math.random() * 15 + 10) + 'px';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.6) + 's';
      drop.style.animationDelay = (Math.random() * 2) + 's';
      drop.style.opacity = Math.random() * 0.5 + 0.3;
      anim.appendChild(drop);
    }
  }

  else if (theme === 'snowy') {
    const flakes = ['❄', '❅', '❆', '✦'];
    for (let i = 0; i < 50; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
      flake.style.left = Math.random() * 100 + 'vw';
      flake.style.fontSize = (Math.random() * 14 + 10) + 'px';
      flake.style.animationDuration = (Math.random() * 4 + 4) + 's';
      flake.style.animationDelay = (Math.random() * 5) + 's';
      anim.appendChild(flake);
    }
  }

  else if (theme === 'sunny') {
    for (let i = 0; i < 12; i++) {
      const ray = document.createElement('div');
      ray.className = 'sun-ray';
      ray.style.top = '-120px';
      ray.style.left = '50%';
      ray.style.transform = `translateX(-50%) rotate(${i * 30}deg)`;
      ray.style.animationDuration = '12s';
      ray.style.animationDelay = '0s';
      anim.appendChild(ray);
    }
  }

  else if (theme === 'hot') {
    for (let i = 0; i < 8; i++) {
      const ray = document.createElement('div');
      ray.className = 'sun-ray';
      ray.style.top = '-120px';
      ray.style.left = '50%';
      ray.style.width = '6px';
      ray.style.background = 'rgba(255, 160, 0, 0.2)';
      ray.style.transform = `translateX(-50%) rotate(${i * 45}deg)`;
      ray.style.animationDuration = '8s';
      anim.appendChild(ray);
    }
    for (let i = 0; i < 4; i++) {
      const wave = document.createElement('div');
      wave.className = 'heat-wave';
      wave.style.bottom = (i * 40) + 'px';
      wave.style.animationDelay = (i * 0.5) + 's';
      wave.style.animationDuration = (2 + i * 0.7) + 's';
      anim.appendChild(wave);
    }
  }

  else if (theme === 'cloudy') {
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      cloud.style.width = (120 + Math.random() * 120) + 'px';
      cloud.style.height = (40 + Math.random() * 30) + 'px';
      cloud.style.top = (Math.random() * 70) + '%';
      cloud.style.animationDuration = (20 + Math.random() * 20) + 's';
      cloud.style.animationDelay = (-Math.random() * 20) + 's';
      anim.appendChild(cloud);
    }
  }

  else if (theme === 'stormy') {
    // Rain
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.height = (Math.random() * 20 + 15) + 'px';
      drop.style.animationDuration = (Math.random() * 0.3 + 0.4) + 's';
      drop.style.animationDelay = (Math.random() * 1) + 's';
      drop.style.opacity = Math.random() * 0.6 + 0.4;
      anim.appendChild(drop);
    }
    // Lightning
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    anim.appendChild(lightning);
  }

  else if (theme === 'night') {
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.top = Math.random() * 90 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.animationDuration = (Math.random() * 3 + 2) + 's';
      star.style.animationDelay = (Math.random() * 3) + 's';
      anim.appendChild(star);
    }
  }

  else if (theme === 'foggy') {
    for (let i = 0; i < 6; i++) {
      const fog = document.createElement('div');
      fog.className = 'fog-layer';
      fog.style.width = (120 + Math.random() * 60) + '%';
      fog.style.top = (10 + i * 15) + '%';
      fog.style.left = (Math.random() * 20 - 10) + '%';
      fog.style.animationDuration = (4 + i * 2) + 's';
      fog.style.animationDelay = (i * 0.5) + 's';
      anim.appendChild(fog);
    }
  }
}

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const card = document.getElementById('weatherCard');
  const errorMsg = document.getElementById('errorMsg');
  const loadingMsg = document.getElementById('loadingMsg');

  if (!city) return;

  card.style.display = 'none';
  errorMsg.style.display = 'none';
  loadingMsg.style.display = 'block';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      loadingMsg.style.display = 'none';
      errorMsg.style.display = 'block';
      return;
    }

    const data = await response.json();
    loadingMsg.style.display = 'none';

    // Check if it's night time using the sunrise/sunset data from API
    const now = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isNight = now < sunrise || now > sunset;

    const weatherId = data.weather[0].id;
    const temp = Math.round(data.main.temp);

    // Apply the dynamic background
    const theme = getWeatherTheme(weatherId, temp, isNight);
    applyBackground(theme);

    // Fill in weather data
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('weatherDesc').textContent = data.weather[0].description;
    document.getElementById('weatherIcon').textContent = getWeatherIcon(weatherId, isNight);
    document.getElementById('temp').textContent = `${temp}°C`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('visibility').textContent = data.visibility
      ? (data.visibility / 1000).toFixed(1) + ' km'
      : 'N/A';
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

    card.style.display = 'block';

    // Fetch 5-day forecast
    getForecast(data.name);

  } catch (error) {
    loadingMsg.style.display = 'none';
    errorMsg.style.display = 'block';
    console.error('Error fetching weather:', error);
  }
}

// Press Enter to search
document.getElementById('cityInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') getWeather();
});