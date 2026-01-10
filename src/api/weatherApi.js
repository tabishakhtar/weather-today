import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 🌆 By city name
export const fetchWeather = (city) =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

// 📍 By location
export const fetchWeatherByLocation = (lat, lon) =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });

// 📰 (Optional) remove if not used
export const fetchNews = () => Promise.resolve({ data: [] });
