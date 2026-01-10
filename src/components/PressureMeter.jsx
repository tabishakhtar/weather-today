export default function PressureMeter({ weather }) {
  if (!weather?.current?.main?.pressure) return null;

  const pressure = weather.current.main.pressure;

  // Normalize pressure for gauge (950–1050 hPa range)
  const min = 950;
  const max = 1050;
  const percent = Math.min(
    100,
    Math.max(0, ((pressure - min) / (max - min)) * 100)
  );

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/15">
      
      {/* Title */}
      <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">
        Pressure
      </p>

      {/* Gauge */}
      <div className="relative w-20 h-20 mb-2">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          {/* Background */}
          <path
            d="M18 2
               a 16 16 0 0 1 0 32
               a 16 16 0 0 1 0 -32"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="3"
          />

          {/* Progress */}
          <path
            d="M18 2
               a 16 16 0 0 1 0 32
               a 16 16 0 0 1 0 -32"
            fill="none"
            stroke="rgba(56,189,248,0.9)"
            strokeWidth="3"
            strokeDasharray={`${percent}, 100`}
            strokeLinecap="round"
          />
        </svg>

        {/* Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-white">
            {pressure}
          </p>
          <p className="text-[10px] text-slate-300">
            hPa
          </p>
        </div>
      </div>

      {/* Status */}
      <p className="text-xs text-slate-400">
        {pressure < 1000
          ? "Low"
          : pressure > 1020
          ? "High"
          : "Normal"}
      </p>
    </div>
  );
}
