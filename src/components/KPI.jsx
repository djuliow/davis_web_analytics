function KPI({ label, value, accent, helper }) {
  return (
    <article className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        {label}
      </p>
      <p className={`mt-4 text-3xl font-semibold ${accent}`}>{value}</p>
      <p className="mt-3 text-sm text-slate-500">{helper}</p>
    </article>
  );
}

export default KPI;
