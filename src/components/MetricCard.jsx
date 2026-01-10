export default function MetricCard({ title, value, unit, subtitle }) {
  return (
    <div
      className="
        bg-white/10 backdrop-blur-lg
        border border-white/20
        rounded-xl px-4 py-3
        text-center
        shadow-md
        transition-all duration-300
        hover:bg-white/15
      "
    >
      <p className="text-xs uppercase tracking-wider text-slate-300">
        {title}
      </p>

      <p className="text-2xl font-bold text-white my-1">
        {value}
        <span className="text-sm text-slate-300 ml-1">{unit}</span>
      </p>

      {subtitle && (
        <p className="text-xs text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}
