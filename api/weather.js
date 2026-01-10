import axios from "axios";

export const fetchWeather = (city) =>
  axios.get(`/api/weather?city=${city}`);

export const fetchWeatherByLocation = (lat, lon) =>
  axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
