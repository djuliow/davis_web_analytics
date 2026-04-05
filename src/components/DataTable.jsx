function DataTable({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Sampled Weather Records</h2>
        <span className="text-xs text-gray-400 font-medium">Showing top 10 rows</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100 bg-gray-50/30">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Temp (°C)</th>
              <th className="px-6 py-4">Humidity</th>
              <th className="px-6 py-4">Condition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{row.date.toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-black text-gray-900">{row.temperature.toFixed(1)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{row.humidity}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                    {row.condition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
