import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import KPI from './KPI';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DataTable from './DataTable';
import DataInsightCard from './DataInsightCard';

const TYPE_OPTIONS = ['Semua', 'Film', 'Acara TV'];

function Dashboard() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('Semua');
  const [error, setError] = useState('');

  useEffect(() => {
    Papa.parse('/netflix_titles.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const cleanedData = data
          .filter((row) => row.show_id && row.title)
          .map((row) => ({
            showId: row.show_id,
            type: row.type?.trim() || 'Tidak diketahui',
            title: row.title?.trim() || 'Tanpa judul',
            country: row.country?.trim() || 'Tidak diketahui',
            rating: row.rating?.trim() || 'Tanpa rating',
            releaseYear: Number(row.release_year) || null,
            genres: row.listed_in
              ? row.listed_in
                  .split(',')
                  .map((genre) => genre.trim())
                  .filter(Boolean)
              : ['Tidak berkategori'],
          }))
          .filter((row) => row.releaseYear);

        setTitles(cleanedData);
        setLoading(false);
      },
      error: () => {
        setError('Gagal memuat dataset Netflix.');
        setLoading(false);
      },
    });
  }, []);

  const filteredTitles = useMemo(() => {
    if (typeFilter === 'Semua') {
      return titles;
    }

    // Mapping balik ke data asli (Movie / TV Show)
    return titles.filter((title) =>
      typeFilter === 'Film'
        ? title.type === 'Movie'
        : title.type === 'TV Show'
    );
  }, [titles, typeFilter]);

  const kpis = useMemo(() => {
    const totalTitles = filteredTitles.length;
    const years = new Set(filteredTitles.map((title) => title.releaseYear));
    const averageTitlesPerYear = years.size
      ? Math.round(totalTitles / years.size).toString()
      : '0';

    const genreCounts = filteredTitles.reduce((counts, title) => {
      title.genres.forEach((genre) => {
        counts[genre] = (counts[genre] || 0) + 1;
      });
      return counts;
    }, {});

    const [mostCommonGenre = 'N/A'] = Object.entries(genreCounts).sort(
      (left, right) => right[1] - left[1],
    )[0] || ['N/A', 0];

    return {
      totalTitles: totalTitles.toLocaleString(),
      averageTitlesPerYear,
      mostCommonGenre,
    };
  }, [filteredTitles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#1e1b4b,_#0f172a_38%,_#020617_78%)] px-6">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 px-8 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
          <p className="mt-5 text-sm font-medium tracking-[0.22em] text-slate-400 uppercase">
            Memproses katalog Netflix
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="rounded-3xl border border-rose-900/50 bg-slate-900 px-8 py-10 text-center shadow-xl">
          <p className="text-lg font-semibold text-slate-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#1e1b4b,_transparent_28%),radial-gradient(circle_at_top_right,_#312e81,_transparent_24%),linear-gradient(180deg,_#0f172a_0%,_#020617_52%,_#020617_100%)] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="rounded-[36px] border border-slate-700/50 bg-slate-950/80 px-6 py-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Analisis Streaming
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Dashboard Analitik Netflix
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Jelajahi pertumbuhan katalog, komposisi konten, distribusi rating, dan detail judul Netflix secara interaktif.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/8 p-2">
              <div className="flex flex-wrap gap-2">
                {TYPE_OPTIONS.map((option) => {
                  const active = option === typeFilter;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTypeFilter(option)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        active
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                          : 'bg-white/8 text-slate-200 hover:bg-white/16'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <KPI
            label="Total Judul"
            value={kpis.totalTitles}
            accent="text-rose-400"
            helper="Jumlah judul data yang tampil."
          />
          <KPI
            label="Rata-rata Judul / Tahun"
            value={kpis.averageTitlesPerYear}
            accent="text-amber-400"
            helper="Rata-rata jumlah rilis judul berdasarkan tahun."
          />
          <KPI
            label="Genre Terpopuler"
            value={kpis.mostCommonGenre}
            accent="text-sky-400"
            helper="Genre dengan jumlah terbanyak pada data."
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <LineChart data={filteredTitles} />
          <BarChart data={filteredTitles} />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.45fr]">
          <PieChart data={filteredTitles} />
          <DataTable data={filteredTitles} />
        </section>

        <section className="mt-8">
          <DataInsightCard data={filteredTitles} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;