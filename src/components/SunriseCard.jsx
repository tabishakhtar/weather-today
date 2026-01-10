import { WiSunrise, WiSunset } from "react-icons/wi";

export default function SunriseCard({ weather }) {
  if (!weather?.current?.sys) return null;

  const sunrise = new Date(
    weather.current.sys.sunrise * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sunset = new Date(
    weather.current.sys.sunset * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/15">
      <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">
        Sun
      </p>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <WiSunrise className="text-4xl text-yellow-300" />
          <p className="text-sm text-white font-semibold">
            {sunrise}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <WiSunset className="text-4xl text-orange-300" />
          <p className="text-sm text-white font-semibold">
            {sunset}
          </p>
        </div>
      </div>
    </div>
  );
}
