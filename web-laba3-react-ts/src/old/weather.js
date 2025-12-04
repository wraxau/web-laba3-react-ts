import '../styles/main.css';
import '../styles/weather.css';

let lastCity = '';

document.getElementById('cityForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  lastCity = city;
  await fetchWeather(city);
});

async function fetchWeather(city) {
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = '<p>Загрузка погоды...</p>';
  resultDiv.classList.add('show');

  try {
    // 1. Геокодинг
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`
    );
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      resultDiv.innerHTML = '<p>Город не найден. Попробуйте другой.</p>';
      return;
    }

    const { lat, lon, display_name } = geoData[0];

    // 2. Погода
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    if (!weatherData.current_weather) {
      resultDiv.innerHTML = '<p>Не удалось получить данные о погоде.</p>';
      return;
    }

    const { temperature, windspeed } = weatherData.current_weather;
    const now = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Иконка по температуре
    let weatherIcon = '🌤️';
    if (temperature < 0) weatherIcon = '❄️';
    else if (temperature < 10) weatherIcon = '☁️';
    else if (temperature < 20) weatherIcon = '⛅';
    else weatherIcon = '☀️';

    // Отображение результата
    resultDiv.innerHTML = `
      <div class="weather-header">
        <span class="weather-icon-large">${weatherIcon}</span>
        <h2>${display_name.split(',')[0]}</h2>
      </div>
      <div class="result-item">
        <label>🌡️ Температура:</label>
        <span>${temperature}°C</span>
      </div>
      <div class="result-item">
        <label>💨 Ветер:</label>
        <span>${windspeed} км/ч</span>
      </div>
      <div class="result-item">
        <label>📅 Запрос:</label>
        <span>${now}</span>
      </div>
      <details class="tech-details">
        <summary>🌍 Техническая информация</summary>
        <p><strong>Координаты:</strong> ${lat}, ${lon}</p>
        <p><strong>API:</strong> Open-Meteo + Nominatim (OpenStreetMap)</p>
      </details>
      <div class="action-buttons">
        <button id="refreshBtn" class="btn">🔄 Обновить</button>
      </div>`;
      
    document.getElementById('refreshBtn').addEventListener('click', () => {
      fetchWeather(lastCity);
    });

  } catch (error) {
    console.error('Ошибка:', error);
    resultDiv.innerHTML = '<p>Произошла ошибка. Проверьте подключение и попробуйте снова.</p>';
  }
}
