export default function FeelsLikeCard({ weather, unit }) {
  if (!weather) return null;

  const feelsLike =
    unit === "metric"
      ? weather.current.main.feels_like
      : weather.current.main.feels_like * 1.8 + 32;

  return (
    <div
      className="
        bg-white/10 backdrop-blur-lg
        border border-white/20
        rounded-2xl p-6
        text-center
        shadow-lg
        transition-all duration-300
        hover:scale-[1.02]
      "
    >
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        Feels Like
      </h2>

      <p className="text-4xl font-bold text-white">
        {Math.round(feelsLike)}°{unit === "metric" ? "C" : "F"}
      </p>

      <p className="text-sm text-slate-300 mt-2">
        Perceived temperature
      </p>
    </div>
  );
}
