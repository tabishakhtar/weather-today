export default function WeatherEffects({ weather }) {
  if (!weather || !weather.current) return null;

  const condition = weather.current.weather[0].main.toLowerCase();

  if (condition.includes("rain")) {
    return <div className="rain" />;
  }

  if (condition.includes("snow")) {
    return <div className="snow" />;
  }

  return null;
}
