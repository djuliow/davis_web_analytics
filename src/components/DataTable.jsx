import { useMemo, useState, useEffect } from 'react';

const ROWS_PER_PAGE = 10;

function DataTable({ data = [] }) {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const rawFilteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const safeData = data.map((item) => ({
      ...item,
      country: item.country && item.country !== 'Unknown' && item.country !== 'Tidak diketahui' ? item.country : '—',
      rating: item.rating || '—',
      genresText: item.genres ? item.genres.join(', ') : '—',
    }));

    if (!normalizedQuery) {
      return safeData;
    }

    return safeData.filter((title) =>
      title.title.toLowerCase().includes(normalizedQuery)
    );
  }, [data, query]);

  const totalPages = Math.max(1, Math.ceil(rawFilteredData.length / ROWS_PER_PAGE));
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentRows = rawFilteredData.slice(startIndex, startIndex + ROWS_PER_PAGE);

  return (
    <section className="rounded-[30px] border border-slate-800 bg-slate-900/60 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur">
      
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-700/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">
            Katalog Judul
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Menampilkan total {rawFilteredData.length.toLocaleString()} judul.
          </p>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul..."
          className="w-full sm:w-72 rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-200 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-900/30"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          
          {/* Header */}
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left font-medium w-1/4">Title</th>
              <th className="px-6 py-4 text-left font-medium">Type</th>
              <th className="px-6 py-4 text-left font-medium w-1/4">Genre</th>
              <th className="px-6 py-4 text-left font-medium">Country</th>
              <th className="px-6 py-4 text-left font-medium">Year</th>
              <th className="px-6 py-4 text-left font-medium">Rating</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-800">
            {currentRows.map((row, index) => (
              <tr
                key={row.showId}
                className={`transition ${
                  index % 2 === 0 ? 'bg-slate-800/40' : 'bg-slate-900/40'
                } hover:bg-rose-950/30`}
              >
                <td className="px-6 py-4 font-medium text-slate-200">
                  {row.title}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {row.type}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {row.genresText}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {row.country}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {row.releaseYear}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                    {row.rating}
                  </span>
                </td>
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-sm text-slate-500">
                  No titles match the current search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-700/80 px-6 py-4">
          <p className="text-sm text-slate-400">
            Halaman <span className="font-medium text-slate-200">{currentPage}</span> dari <span className="font-medium text-slate-200">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default DataTable;