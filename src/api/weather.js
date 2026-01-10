import axios from "axios";

export default async function handler(req, res) {
  const { city, lat, lon } = req.query;

  const API_KEY = process.env.WEATHER_API_KEY;
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  try {
    let url = BASE_URL + "?appid=" + API_KEY + "&units=metric";

    if (city) url += `&q=${city}`;
    if (lat && lon) url += `&lat=${lat}&lon=${lon}`;

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Weather fetch failed" });
  }
}
