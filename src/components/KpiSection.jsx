function KpiSection({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-transform hover:scale-105">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Records</p>
        <p className="text-4xl font-black text-blue-600 mt-2">{stats.total}</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-transform hover:scale-105">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Avg Temperature</p>
        <p className="text-4xl font-black text-orange-500 mt-2">{stats.avgTemp}°C</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-transform hover:scale-105">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Max Temperature</p>
        <p className="text-4xl font-black text-red-600 mt-2">{stats.maxTemp}°C</p>
      </div>
    </div>
  );
}

export default KpiSection;
