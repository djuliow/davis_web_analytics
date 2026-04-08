import { useMemo } from 'react';

function DataInsightCard({ data = [] }) {
  const { mainInsight, trend, recommendation } = useMemo(() => {
    if (!data.length) return { mainInsight: 'Menunggu data...', trend: 'Menunggu data...', recommendation: 'Menunggu data...' };

    let movies = 0;
    let tvShows = 0;
    const genreCounts = {};
    const yearCounts = {};
    const countryCounts = {};

    data.forEach(title => {
      if (title.type === 'Movie') movies++;
      else tvShows++;
      
      if (title.genres) {
        title.genres.forEach(g => {
          const cg = g.trim();
          if (cg) genreCounts[cg] = (genreCounts[cg] || 0) + 1;
        });
      }

      if (title.releaseYear && title.releaseYear >= 2000) {
        yearCounts[title.releaseYear] = (yearCounts[title.releaseYear] || 0) + 1;
      }

      if (title.country && title.country !== '—' && title.country !== 'Unknown' && title.country !== 'Tidak diketahui') {
        title.country.split(',').forEach(c => {
          const cc = c.trim();
          if (cc) countryCounts[cc] = (countryCounts[cc] || 0) + 1;
        });
      }
    });

    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const topYear = Object.entries(yearCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const topCountry = Object.entries(countryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Luar Negeri';
    const total = data.length;
    const movieRatio = Math.round((movies / total) * 100);
    const tvRatio = 100 - movieRatio;

    const domType = movies > tvShows ? 'Film' : 'Acara TV';
    const domRatio = Math.max(movieRatio, tvRatio);

    const mainInsight = `Terdapat total ${total.toLocaleString()} judul, dengan format ${domType} mendominasi sebesar ${domRatio}%. Berdasarkan asal wilayah produksi, ${topCountry} saat ini menjadi pasar pemasok konten Netflix terbesar.`;
    
    const trend = `Genre "${topGenre}" merupakan kategori tayangan yang paling banyak tersedia. Tahun ${topYear} tercapai sebagai tahun rilis paling subur untuk ketersediaan judul dalam dua dekade terakhir.`;

    const recommendation = `Fokuskan upaya akuisisi konten dan investasi baru pada materi bergenre "${topGenre}". Selain itu, tingkatkan keragaman (diversifikasi) library dengan memproduksi konten orisinal di luar kawasan ${topCountry}.`;

    return { mainInsight, trend, recommendation };
  }, [data]);

  return (
    <div className="rounded-[30px] border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-900/50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </span>
            Insight Data
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Rangkuman wawasan strategis, tren, dan rekomendasi terkait data.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        <article className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 transition hover:bg-slate-800/60 hover:shadow-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Insight Utama
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            {mainInsight}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 transition hover:bg-slate-800/60 hover:shadow-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Tren yang Ditemukan
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            {trend}
          </p>
        </article>

        <article className="rounded-2xl border border-rose-900/30 bg-rose-950/20 p-5 transition hover:bg-rose-950/40 hover:shadow-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
            Rekomendasi Strategis
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            {recommendation}
          </p>
        </article>
      </div>
    </div>
  );
}

export default DataInsightCard;
