import sunny from "../assets/backgrounds/sunny.jpg";
import rainy from "../assets/backgrounds/rainy.jpg";
import cloudy from "../assets/backgrounds/cloudy.jpg";
import night from "../assets/backgrounds/night.jpg";
import daySnow from "../assets/backgrounds/daysnowfall.jpg";
import nightSnow from "../assets/backgrounds/nightsnow.jpg";

export default function getBackground(weather) {
  if (!weather || !weather.current) return cloudy;

  const condition = weather.current.weather[0].main.toLowerCase();
  const icon = weather.current.weather[0].icon;
  const isNight = icon.endsWith("n");

  // ❄️ SNOW HAS HIGHEST PRIORITY
  if (condition.includes("snow")) {
    return isNight ? nightSnow : daySnow;
  }

  // 🌧 RAIN
  if (condition.includes("rain")) {
    return rainy;
  }

  // ☁️ CLOUD / FOG / MIST
  if (
    condition.includes("cloud") ||
    condition.includes("fog") ||
    condition.includes("mist")
  ) {
    return cloudy;
  }

  // ☀️ CLEAR WEATHER
  if (condition.includes("clear")) {
    return isNight ? night : sunny;
  }

  // fallback
  return cloudy;
}
