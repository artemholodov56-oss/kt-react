// src/pages/Weather.tsx
import { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Функция для получения координат города (геокодинг)
  const getCoordinates = async (cityName: string) => {
    const res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=ru&format=json`,
    );
    if (!res.data.results || res.data.results.length === 0) {
      throw new Error("Город не найден");
    }
    return res.data.results[0];
  };

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      // 1. Получаем координаты
      const location = await getCoordinates(city);

      // 2. Получаем погоду по координатам
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&timezone=auto`,
      );

      setWeather({
        name: location.name,
        country: location.country,
        temp: res.data.current_weather.temperature,
        windspeed: res.data.current_weather.windspeed,
        weathercode: res.data.current_weather.weathercode,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при загрузке данных ");
    } finally {
      setLoading(false);
    }
  };

  // Расшифровка кодов погоды Open-Meteo
  const getWeatherDesc = (code: number) => {
    const codes: Record<number, string> = {
      0: "Ясно",
      1: "Преимущественно ясно",
      2: "Переменная облачность",
      3: "Пасмурно",
      45: "Туман",
      51: "Морось",
      61: "Дождь",
      71: "Снег",
      95: "Гроза",
    };
    return codes[code] || "Неизвестно";
  };

  return (
    <div className="weather-page container">
      <h1>Прогноз погоды </h1>

      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          placeholder="Введите город (например: Москва)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Найти"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.country}
          </h2>
          <div className="temp">{Math.round(weather.temp)}°C</div>
          <p className="desc">{getWeatherDesc(weather.weathercode)}</p>

          <div className="details">
            <div className="detail-item">
              <span>Ветер:</span>
              <strong>{weather.windspeed} км/ч</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
