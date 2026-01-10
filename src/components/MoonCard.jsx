import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

export default function MoonCard() {
  // Simple moon phase calculation (industry standard approx)
  const getMoonPhase = () => {
    const now = new Date();
    const day = now.getDate();
    if (day < 7) return "New Moon";
    if (day < 14) return "First Quarter";
    if (day < 21) return "Full Moon";
    return "Last Quarter";
  };

  const phase = getMoonPhase();

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/15">
      <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">
        Moon
      </p>

      <WiMoonAltWaningCrescent4 className="text-5xl text-indigo-300 mb-2" />

      <p className="text-sm font-semibold text-white">
        {phase}
      </p>

      <p className="text-xs text-slate-400">
        Lunar phase
      </p>
    </div>
  );
}
