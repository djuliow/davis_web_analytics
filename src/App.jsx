import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import KpiSection from './components/KpiSection';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import DataTable from './components/DataTable';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, avgTemp: 0, maxTemp: 0 });

  useEffect(() => {
    Papa.parse('/weatherHistory.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const parsedData = results.data
          .filter(row => row['Formatted Date']) 
          .map((row, index) => ({
            date: new Date(row['Formatted Date']),
            temperature: parseFloat(row['Temperature (C)']),
            humidity: parseFloat(row['Humidity']),
            condition: row['Summary'],
            index: index
          }))
          .filter((_, index) => index % 24 === 0);

        setData(parsedData);
        
        const total = parsedData.length;
        const avgTemp = parsedData.reduce((acc, curr) => acc + curr.temperature, 0) / total;
        const maxTemp = Math.max(...parsedData.map(d => d.temperature));

        setStats({
          total,
          avgTemp: avgTemp.toFixed(2),
          maxTemp: maxTemp.toFixed(2)
        });
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Analytics Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <header className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Weather Analytics</h1>
        <p className="text-gray-500 mt-2">Historical climate data visualization and insights</p>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* KPI Section Component */}
        <KpiSection stats={stats} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <LineChart data={data} />
          <PieChart data={data} />
          <BarChart data={data} />
        </div>

        {/* Data Table Component */}
        <DataTable data={data} />

        {/* Analysis Section */}
        <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 ring-1 ring-black/5 mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Data-Driven Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Main Insight</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                The dataset highlights a significant seasonal variation. With a maximum recorded temperature of {stats.maxTemp}°C, there is a clear pattern of extreme weather spikes that correlate with specific periods in the historical timeline.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Observed Trend</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Based on {stats.total} sampled records, we observe a cyclical cooling and warming trend. "Partly Cloudy" remains the dominant condition, suggesting stable atmospheric pressure throughout the majority of the recorded data.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Recommendation</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Resource allocation for cooling and heating systems should be adjusted based on the {stats.avgTemp}°C average. Additionally, the prevalence of humidity-related conditions suggests a need for moisture-resistant infrastructure in long-term planning.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-400 text-xs py-6">
        &copy; 2026 Weather Analytics Dashboard. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
