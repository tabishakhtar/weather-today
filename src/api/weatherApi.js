import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/weather",
});

export const fetchWeather = (city) => API.get(`/${city}`);
export const fetchNews = () => API.get("/news/weather");
export const fetchWeatherByLocation = (lat, lon) =>
  API.get(`/location/weather?lat=${lat}&lon=${lon}`);

