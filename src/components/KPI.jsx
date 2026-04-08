function KPI({ label, value, accent = "text-white", helper, icon }) {
  return (
    <article className="group rounded-[28px] border border-slate-800 bg-slate-900/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur transition hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)] hover:bg-slate-900/80">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          {label}
        </p>

        {/* Optional Icon */}
        {icon && (
          <div className="text-slate-500 group-hover:text-slate-300">
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
        <p className="mt-3 text-sm leading-relaxed text-slate-500 group-hover:text-slate-400">
          {helper}
        </p>
      )}
    </article>
  );
}

export default KPI;