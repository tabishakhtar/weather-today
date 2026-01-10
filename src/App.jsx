import { useEffect, useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import News from "./components/News";
import WeatherEffects from "./components/WeatherEffects";
import WindDirectionCard from "./components/WindDirectionCard";
import PressureMeter from "./components/PressureMeter";
import { fetchWeatherByLocation } from "./api/weatherApi";
import getBackground from "./utils/getBackground";

import { WiDayCloudy, WiThermometer, WiHumidity } from "react-icons/wi";
import SunriseCard from "./components/SunriseCard";
import MoonCard from "./components/MoonCard";
import LoadingScreen from "./components/LoadingScreen";
console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);


function App() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric"); // °C / °F

  // 🌍 Auto-detect location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetchWeatherByLocation(latitude, longitude);
        setWeather(res.data);
      },
      () => console.log("Location permission denied")
    );
  }, []);
  if (!weather) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${getBackground(weather)})` }}
    >
      {/* 🌧❄️ Weather effects */}
      <WeatherEffects weather={weather} />

      {/* 🌑 Dark overlay */}
      <div className="relative z-10 min-h-screen bg-black/50 text-slate-100 p-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <WiDayCloudy className="text-6xl text-sky-300 animate-float" />
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent text-center">
            Weather Today
          </h1>
          <p className="text-sm text-slate-300">
            Live forecast • Real-time conditions
          </p>
        </div>

        {/* ================= UNIT TOGGLE ================= */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 font-semibold transition hover:bg-white/20"
          >
            Switch to {unit === "metric" ? "°F" : "°C"}
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="flex justify-center mb-6">
          <Search setWeather={setWeather} />
        </div>

        {/* ================= MAIN CONTENT ================= */}
        {weather && weather.current && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ✅ Main Weather (WIDER HORIZONTALLY) */}
              <div className="md:col-span-2">
                <WeatherCard weather={weather} unit={unit} />
              </div>

              {/* Metric / Visual Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Metric
                  title="Feels Like"
                  value={
                    unit === "imperial"
                      ? (weather.current.main.feels_like * 9) / 5 + 32
                      : weather.current.main.feels_like
                  }
                  unit={unit === "metric" ? "°C" : "°F"}
                  icon={<WiThermometer />}
                />

                <Metric
                  title="Humidity"
                  value={weather.current.main.humidity}
                  unit="%"
                  icon={<WiHumidity />}
                />

                <WindDirectionCard weather={weather} unit={unit} />
                <PressureMeter weather={weather} />
                <SunriseCard weather={weather} />
                <MoonCard />
              </div>
            </div>

            {/* Forecast */}
            <Forecast forecast={weather.forecast} unit={unit} />
          </div>
        )}

        {/* ================= NEWS (BOTTOM) ================= */}
        <div className="max-w-5xl mx-auto mt-10">
          <News />
        </div>
      </div>
    </div>
  );
}

/* ================= METRIC CARD ================= */
function Metric({ title, value, unit, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:bg-white/15">
      <div className="text-3xl text-sky-300">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-300">
          {title}
        </p>
        <p className="text-xl font-bold text-white">
          {Math.round(value)}
          {unit}
        </p>
      </div>
    </div>
  );
}

export default App;
