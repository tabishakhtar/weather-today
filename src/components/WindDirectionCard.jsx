import { WiWindDeg } from "react-icons/wi";

export default function WindDirectionCard({ weather, unit }) {
  if (!weather?.current?.wind) return null;

  const speed =
    unit === "imperial"
      ? weather.current.wind.speed * 2.237 // m/s → mph
      : weather.current.wind.speed;

  const deg = weather.current.wind.deg ?? 0;

  // Convert degrees to compass text
  const getDirection = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return "N";
    if (deg < 67.5) return "NE";
    if (deg < 112.5) return "E";
    if (deg < 157.5) return "SE";
    if (deg < 202.5) return "S";
    if (deg < 247.5) return "SW";
    if (deg < 292.5) return "W";
    return "NW";
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/15">
      
      {/* Title */}
      <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">
        Wind
      </p>

      {/* BIG COMPASS */}
      <div
        className="text-7xl text-cyan-300 transition-transform duration-500 mb-2"
        style={{ transform: `rotate(${deg}deg)` }}
      >
        <WiWindDeg />
      </div>

      {/* Direction */}
      <p className="text-sm text-slate-200 font-semibold">
        {getDirection(deg)} ({deg}°)
      </p>

      {/* Speed */}
      <p className="text-lg font-bold text-white mt-1">
        {Math.round(speed)} {unit === "imperial" ? "mph" : "m/s"}
      </p>
    </div>
  );
}
