import { useMemo, useState } from 'react';

const ROW_LIMIT = 12;

function DataTable({ data }) {
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return data.slice(0, ROW_LIMIT);
    }

    return data
      .filter((title) => title.title.toLowerCase().includes(normalizedQuery))
      .slice(0, ROW_LIMIT);
  }, [data, query]);

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/88 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Catalog Table</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search by title, capped at {ROW_LIMIT} visible rows.
          </p>
        </div>

        <label className="block">
          <span className="sr-only">Search by title</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title..."
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100 sm:w-72"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-950 text-xs uppercase tracking-[0.2em] text-slate-300">
            <tr>
              <th className="px-5 py-4 font-medium sm:px-6">Title</th>
              <th className="px-5 py-4 font-medium sm:px-6">Type</th>
              <th className="px-5 py-4 font-medium sm:px-6">Country</th>
              <th className="px-5 py-4 font-medium sm:px-6">Year</th>
              <th className="px-5 py-4 font-medium sm:px-6">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {filteredRows.map((row) => (
              <tr key={row.showId} className="bg-white/60 transition hover:bg-rose-50/70">
                <td className="px-5 py-4 font-medium text-slate-900 sm:px-6">{row.title}</td>
                <td className="px-5 py-4 text-slate-600 sm:px-6">{row.type}</td>
                <td className="px-5 py-4 text-slate-600 sm:px-6">{row.country}</td>
                <td className="px-5 py-4 text-slate-600 sm:px-6">{row.releaseYear}</td>
                <td className="px-5 py-4 sm:px-6">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {row.rating}
                  </span>
                </td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-sm text-slate-500 sm:px-6">
                  No titles match the current search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DataTable;
