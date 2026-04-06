import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import KPI from './KPI';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DataTable from './DataTable';

const TYPE_OPTIONS = ['All', 'Movie', 'TV Show'];

function Dashboard() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('All');
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
            type: row.type?.trim() || 'Unknown',
            title: row.title?.trim() || 'Untitled',
            country: row.country?.trim() || 'Unknown',
            rating: row.rating?.trim() || 'Unrated',
            releaseYear: Number(row.release_year) || null,
            genres: row.listed_in
              ? row.listed_in
                  .split(',')
                  .map((genre) => genre.trim())
                  .filter(Boolean)
              : ['Uncategorized'],
          }))
          .filter((row) => row.releaseYear);

        setTitles(cleanedData);
        setLoading(false);
      },
      error: () => {
        setError('Failed to load Netflix dataset.');
        setLoading(false);
      },
    });
  }, []);

  const filteredTitles = useMemo(() => {
    if (typeFilter === 'All') {
      return titles;
    }

    return titles.filter((title) => title.type === typeFilter);
  }, [titles, typeFilter]);

  const kpis = useMemo(() => {
    const totalTitles = filteredTitles.length;
    const years = new Set(filteredTitles.map((title) => title.releaseYear));
    const averageTitlesPerYear = years.size
      ? (totalTitles / years.size).toFixed(1)
      : '0.0';

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
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#ffe4e6,_#fff7ed_38%,_#f8fafc_78%)] px-6">
        <div className="rounded-[32px] border border-white/70 bg-white/80 px-8 py-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
          <p className="mt-5 text-sm font-medium tracking-[0.22em] text-slate-500 uppercase">
            Parsing Netflix catalog
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="rounded-3xl border border-rose-200 bg-white px-8 py-10 text-center shadow-xl">
          <p className="text-lg font-semibold text-slate-900">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ffe4e6,_transparent_28%),radial-gradient(circle_at_top_right,_#fde68a,_transparent_24%),linear-gradient(180deg,_#fffaf5_0%,_#f8fafc_52%,_#eef2ff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="rounded-[36px] border border-white/60 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Streaming intelligence
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Netflix Titles Dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Explore catalog growth, content mix, rating distribution, and searchable title-level details from the Netflix dataset.
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
            label="Total Titles"
            value={kpis.totalTitles}
            accent="text-rose-600"
            helper="Visible records after the active content-type filter."
          />
          <KPI
            label="Average Titles / Year"
            value={kpis.averageTitlesPerYear}
            accent="text-amber-600"
            helper="Average release volume across unique release years."
          />
          <KPI
            label="Most Common Genre"
            value={kpis.mostCommonGenre}
            accent="text-sky-700"
            helper="Top genre tag across the filtered catalog selection."
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
      </div>
    </div>
  );
}

export default Dashboard;
