import { useMemo, useState } from 'react';

const ROW_LIMIT = 12;

function DataTable({ data = [] }) {
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const safeData = data.map((item) => ({
      ...item,
      country: item.country && item.country !== 'Unknown' ? item.country : '—',
      rating: item.rating || '—',
    }));

    if (!normalizedQuery) {
      return safeData.slice(0, ROW_LIMIT);
    }

    return safeData
      .filter((title) =>
        title.title.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, ROW_LIMIT);
  }, [data, query]);

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Catalog Table
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Search by title, capped at {ROW_LIMIT} visible rows.
          </p>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title..."
          className="w-full sm:w-72 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          
          {/* Header */}
          <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-300">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Title</th>
              <th className="px-6 py-4 text-left font-medium">Type</th>
              <th className="px-6 py-4 text-left font-medium">Country</th>
              <th className="px-6 py-4 text-left font-medium">Year</th>
              <th className="px-6 py-4 text-left font-medium">Rating</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-200">
            {filteredRows.map((row, index) => (
              <tr
                key={row.showId}
                className={`transition ${
                  index % 2 === 0 ? 'bg-white/70' : 'bg-slate-50/60'
                } hover:bg-rose-50`}
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.title}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {row.type}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {row.country}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {row.releaseYear}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {row.rating}
                  </span>
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-slate-500">
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