import { useMemo } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart({ data = [] }) {
  const { dataPoints, insight } = useMemo(() => {
    const releasesByYear = data.reduce((counts, title) => {
      const year = Number(title?.releaseYear);

      if (!Number.isNaN(year) && year >= 2000 && year <= 2020) {
        counts[year] = (counts[year] || 0) + 1;
      }

      return counts;
    }, {});

    const yearlyPoints = Object.entries(releasesByYear)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([year, count]) => ({
        x: Number(year),
        y: count,
      }));

    const peakPoint = yearlyPoints.reduce(
      (peak, point) => (point.y > peak.y ? point : peak),
      { x: null, y: 0 },
    );
    const firstPoint = yearlyPoints[0];
    const lastPoint = yearlyPoints[yearlyPoints.length - 1];
    const trendDirection =
      firstPoint && lastPoint && lastPoint.y >= firstPoint.y
        ? 'meningkat'
        : 'menurun';

    const chartInsight = peakPoint.x
      ? `Jumlah judul Netflix cenderung ${trendDirection} dalam periode 2000-2020, dengan puncak rilis terjadi pada tahun ${peakPoint.x} sebanyak ${peakPoint.y.toLocaleString()} judul.`
      : 'Tren rilis akan muncul setelah dataset dimuat.';

    return {
      dataPoints: yearlyPoints,
      insight: chartInsight,
    };
  }, [data]);

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'dark2',
    title: {
      text: 'Jumlah Judul Berdasarkan Tahun Rilis (2000-2020)',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    axisX: {
      title: 'Tahun Rilis',
      interval: 5,
      minimum: 2000,
      maximum: 2020,
      labelFontColor: '#94a3b8',
      titleFontColor: '#cbd5e1',
      gridThickness: 0,
    },
    axisY: {
      title: 'Jumlah Judul',
      labelFontColor: '#94a3b8',
      titleFontColor: '#cbd5e1',
      gridColor: '#334155',
      tickColor: '#475569',
    },
    toolTip: {
      content: 'Tahun {x}: {y} judul',
      cornerRadius: 10,
    },
    data: [
      {
        type: 'line',
        color: '#e11d48',
        lineThickness: 3,
        markerSize: 6,
        dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-slate-800 bg-slate-900/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur sm:p-6">
      <CanvasJSChart options={options} />
      <p className="mt-5 rounded-2xl bg-slate-800/50 px-4 py-3 text-sm leading-6 text-slate-300">
        <span className="font-bold text-rose-400">Insight:</span> {insight}
      </p>
    </section>
  );
}

export default LineChart;
