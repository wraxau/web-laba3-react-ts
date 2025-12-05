import { useState } from "react";
//import "../styles/style.css";
import "../styles/weather.css";

interface GeoData {
  lat: string;
  lon: string;
  display_name: string;
}

interface WeatherAPIResponse {
  current_weather?: {
    temperature: number;
    windspeed: number;
  };
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [weather, setWeather] = useState<{
    displayName: string;
    temperature: number;
    windspeed: number;
    lat: string;
    lon: string;
    now: string;
    icon: string;
  } | null>(null);

  async function fetchWeather(cityName: string) {
    try {
      setLoading(true);
      setError(null);
      setWeather(null);

      // 1. Геокодинг
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          cityName
        )}&format=json&limit=1`
      );
      const geo: GeoData[] = await geoResponse.json();

      if (!geo || geo.length === 0) {
        setError("Город не найден. Попробуйте другой.");
        return;
      }

      const { lat, lon, display_name } = geo[0];

      // 2. Погода
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const weatherData: WeatherAPIResponse = await weatherResponse.json();

      if (!weatherData.current_weather) {
        setError("Не удалось получить данные о погоде.");
        return;
      }

      const { temperature, windspeed } = weatherData.current_weather;

      const now = new Date().toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Иконка по температуре
      let icon = "🌤️";
      if (temperature < 0) icon = "❄️";
      else if (temperature < 10) icon = "☁️";
      else if (temperature < 20) icon = "⛅";
      else icon = "☀️";

      setWeather({
        displayName: display_name.split(",")[0],
        temperature,
        windspeed,
        lat,
        lon,
        now,
        icon,
      });
    } catch (e) {
      setError("Произошла ошибка. Проверьте подключение.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!city.trim()) return;

    setLastCity(city);
    fetchWeather(city);
  }

  return (
    <div className="weather-container">
      <h1>Погода</h1>

      <form id="cityForm" onSubmit={handleSubmit}>
        <input
          id="cityInput"
          type="text"
          placeholder="Введите город..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn">
          Показать
        </button>
      </form>

      <div id="weatherResult" className={`result-block ${weather || loading ? "show" : ""}`}>
        {loading && <p>Загрузка погоды...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <>
            <div className="weather-header">
              <span className="weather-icon-large">{weather.icon}</span>
              <h2>{weather.displayName}</h2>
            </div>

            <div className="result-item">
              <label>🌡️ Температура:</label>
              <span>{weather.temperature}°C</span>
            </div>

            <div className="result-item">
              <label>💨 Ветер:</label>
              <span>{weather.windspeed} км/ч</span>
            </div>

            <div className="result-item">
              <label>📅 Запрос:</label>
              <span>{weather.now}</span>
            </div>

            <details className="tech-details">
              <summary>🌍 Техническая информация</summary>
              <p>
                <strong>Координаты:</strong> {weather.lat}, {weather.lon}
              </p>
              <p>
                <strong>API:</strong> Open-Meteo + Nominatim (OpenStreetMap)
              </p>
            </details>

            <div className="action-buttons">
              <button
                type="button"
                className="btn"
                onClick={() => fetchWeather(lastCity)}
              >
                🔄 Обновить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
