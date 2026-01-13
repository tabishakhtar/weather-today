import getWeatherIcon from "../utils/getWeatherIcon";

export default function WeatherCard({ weather, unit }) {
  if (
    !weather ||
    !weather.current ||
    !weather.current.main ||
    !weather.current.weather
  ) {
    return null;
  }

  const condition = weather.current.weather[0].main.toLowerCase();
  const isNight = weather.current.weather[0].icon?.endsWith("n");

  const tempC = weather.current.main.temp;
  const temp =
    unit === "imperial"
      ? Math.round((tempC * 9) / 5 + 32)
      : Math.round(tempC);

  // ✅ FIX: hourly data source
  const hourly =
    weather.forecast?.list?.slice(0, 12) || [];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/40">
      
      {/* ================= CITY ================= */}
      <h2 className="text-xl font-semibold text-white text-center mb-2">
        {weather.current.name}
      </h2>

      {/* ================= MAIN ICON ================= */}
      <div
        className={`flex justify-center text-7xl mb-2 ${
          condition.includes("rain")
            ? "text-sky-300 animate-rain"
            : condition.includes("snow")
            ? "text-blue-200 animate-snow"
            : condition.includes("cloud")
            ? "text-slate-300 animate-cloud"
            : "text-yellow-300 animate-sun"
        }`}
      >
        {getWeatherIcon(condition, isNight)}
      </div>

      {/* ================= TEMPERATURE ================= */}
      <p className="text-4xl font-bold text-white text-center">
        {temp}°{unit === "imperial" ? "F" : "C"}
      </p>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-center text-slate-200 capitalize mb-4">
        {weather.current.weather[0].description}
      </p>

      {/* ================= MINI GRAPH ================= */}
      {hourly.length > 0 && (
        <div className="mb-4 overflow-hidden">
          <svg viewBox="0 0 300 60" className="w-full h-14">
            <polyline
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2"
              points={hourly
                .map((h, i) => {
                  const t =
                    unit === "imperial"
                      ? (h.main.temp * 9) / 5 + 32
                      : h.main.temp;
                  const x = (i / (hourly.length - 1)) * 300;
                  const y = 60 - t * 1.2;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
        </div>
      )}

      {/* ================= HOURLY FORECAST ================= */}
      {hourly.length > 0 && (
        <div>
          <h3 className="text-sm text-slate-300 mb-2">
            Hourly Forecast
          </h3>

          {/* ✅ Scroll visible only on hover (CSS already exists) */}
          <div className="flex gap-4 hourly-scroll pb-3">
            {hourly.map((hour, i) => {
              const hourCondition =
                hour.weather[0].main.toLowerCase();
              const hourIsNight =
                hour.weather[0].icon?.endsWith("n");

              const time = new Date(hour.dt * 1000).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              );

              const hourTemp =
                unit === "imperial"
                  ? Math.round((hour.main.temp * 9) / 5 + 32)
                  : Math.round(hour.main.temp);

              return (
                <div
                  key={i}
                  className="min-w-[90px] bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:border-white/40"
                >
                  <span className="text-xs text-slate-300 mb-1">
                    {time}
                  </span>

                  <div
                    className={`text-3xl mb-1 ${
                      hourCondition.includes("rain")
                        ? "text-sky-300"
                        : hourCondition.includes("snow")
                        ? "text-blue-200"
                        : hourCondition.includes("cloud")
                        ? "text-slate-300"
                        : "text-yellow-300"
                    }`}
                  >
                    {getWeatherIcon(hourCondition, hourIsNight)}
                  </div>

                  <span className="text-white font-semibold">
                    {hourTemp}°
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
