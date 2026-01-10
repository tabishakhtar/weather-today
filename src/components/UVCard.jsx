export default function UVCard({ weather }) {
  if (!weather) return null;

  const hour = new Date().getHours();
  const condition = weather.current.weather[0].main;

  let uvText = "Low";
  let uvColor = "text-green-400";

  if (hour >= 10 && hour <= 16) {
    if (condition === "Clear") {
      uvText = "High";
      uvColor = "text-red-400";
    } else {
      uvText = "Moderate";
      uvColor = "text-yellow-400";
    }
  }

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
        UV Index
      </h2>

      <p className={`text-4xl font-bold ${uvColor}`}>
        {uvText}
      </p>

      <p className="text-sm text-slate-300 mt-2">
        {uvText === "High" ? "Use sun protection" : "Safe conditions"}
      </p>
    </div>
  );
}
