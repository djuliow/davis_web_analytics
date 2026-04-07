function KPI({ label, value, accent = "text-slate-900", helper, icon }) {
  return (
    <article className="group rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur transition hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          {label}
        </p>

        {/* Optional Icon */}
        {icon && (
          <div className="text-slate-400 group-hover:text-slate-600">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className={`mt-4 text-3xl font-semibold tracking-tight ${accent}`}>
        {value ?? "—"}
      </p>

      {/* Helper */}
      {helper && (
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {helper}
        </p>
      )}
    </article>
  );
}

export default KPI;