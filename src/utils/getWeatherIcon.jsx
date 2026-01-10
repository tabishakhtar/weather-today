import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

export default function getWeatherIcon(condition, isNight) {
  if (condition.includes("thunder")) return <WiThunderstorm />;
  if (condition.includes("rain")) return <WiRain />;
  if (condition.includes("snow")) return <WiSnow />;
  if (condition.includes("fog") || condition.includes("mist"))
    return <WiFog />;
  if (condition.includes("cloud")) return <WiCloudy />;

  return isNight ? <WiNightClear /> : <WiDaySunny />;
}
