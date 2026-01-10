import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";

export default function Search({ setWeather }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const trimmedCity = city.trim();

    // ❌ Block empty input
    if (!trimmedCity) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const res = await fetchWeather(trimmedCity);
      setWeather(res.data);
      setCity("");
    } catch (err) {
      setError("City not found");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="
            px-4 py-2
            rounded-l-lg
            bg-white/20
            backdrop-blur
            text-white
            placeholder-slate-300
            outline-none
          "
        />

        <button
          onClick={handleSearch}
          className="
            px-4 py-2
            bg-sky-400
            text-slate-900
            font-semibold
            rounded-r-lg
            hover:bg-sky-300
          "
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-red-300 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
