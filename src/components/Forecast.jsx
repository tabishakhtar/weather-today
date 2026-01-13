import getWeatherIcon from "../utils/getWeatherIcon";

export default function Forecast({ forecast, unit }) {
  // ✅ FIX: forecast comes from /forecast API → use forecast.list
  if (!forecast || !forecast.list || forecast.list.length === 0) return null;

  // ✅ Take one forecast per day (every 8th item = 24 hours)
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <div
      className="
        bg-white/10 backdrop-blur-lg
        border border-white/20
        p-6 rounded-2xl shadow-lg

        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:border-white/40
      "
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        5-Day Forecast
      </h2>

      <div className="space-y-3">
        {dailyForecast.map((day, index) => {
          const condition = day.weather[0].main.toLowerCase();
          const isNight = day.weather[0].icon.endsWith("n");

          const tempC = day.main.temp;
          const temp =
            unit === "imperial"
              ? Math.round((tempC * 9) / 5 + 32)
              : Math.round(tempC);

          return (
            <div
              key={index}
              className="
                flex justify-between items-center
                border-b border-white/20 pb-2
                transition-colors duration-300
                hover:bg-white/5
              "
            >
              {/* Date */}
              <span className="text-sm text-slate-200">
                {new Date(day.dt_txt).toDateString()}
              </span>

              {/* 🌦 Forecast Icon */}
              <div
                className={`text-3xl ${
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

              {/* Temperature */}
              <span className="font-semibold text-white">
                {temp}°{unit === "imperial" ? "F" : "C"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
