import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 🌍 Current weather by city
export const fetchWeather = (city) =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

// 📍 Current + forecast by location (FREE API)
export const fetchWeatherByLocation = async (lat, lon) => {
  const current = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });

  const forecast = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });

  return {
    current: current.data,
    forecast: forecast.data, // list[] inside
  };
};
