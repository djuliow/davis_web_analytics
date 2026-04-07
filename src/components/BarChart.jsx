import { useMemo } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Warna gradasi (lebih clean & profesional)
const BAR_COLORS = [
  '#1e3a8a',
  '#1d4ed8',
  '#2563eb',
  '#3b82f6',
  '#0284c7',
  '#0ea5e9',
  '#0891b2',
  '#0f766e',
];

function BarChart({ data = [] }) {
  const { dataPoints, insight } = useMemo(() => {
    // Hitung jumlah genre
    const genreCounts = data.reduce((counts, title) => {
      if (!title?.genres) return counts;

      title.genres.forEach((genre) => {
        const cleanGenre = genre.trim();

        if (cleanGenre) {
          counts[cleanGenre] = (counts[cleanGenre] || 0) + 1;
        }
      });

      return counts;
    }, {});

    // Sorting dari terbesar
    const sortedGenres = Object.entries(genreCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Ambil Top 8
    const topGenres = sortedGenres.slice(0, 8);

    // Insight versi Indonesia
    const topGenreNames = topGenres.slice(0, 3).map(([genre]) => genre);

    const chartInsight = topGenreNames.length
      ? `${topGenreNames.join(', ')} merupakan genre yang paling dominan, menunjukkan bahwa Netflix memprioritaskan kategori konten dengan permintaan tinggi dan daya tarik global.`
      : 'Distribusi genre akan muncul setelah dataset dimuat.';

    return {
      dataPoints: topGenres.map(([genre, count], index) => ({
        label: genre,
        y: count,
        color: BAR_COLORS[index % BAR_COLORS.length],
        indexLabel: count.toLocaleString(),
      })),
      insight: chartInsight,
    };
  }, [data]);

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Distribusi Genre Teratas',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    axisX: {
      labelFontColor: '#475569',
      labelFontSize: 12,
      labelMaxWidth: 170,
      tickThickness: 0,
      lineThickness: 0,
    },
    axisY: {
      title: 'Jumlah Judul',
      includeZero: true,
      labelFontColor: '#64748b',
      titleFontColor: '#475569',
      gridColor: '#e2e8f0',
    },
    toolTip: {
      content: '<b>{label}</b>: {y} judul',
      cornerRadius: 10,
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{indexLabel}',
        indexLabelFontColor: '#0f172a',
        indexLabelFontWeight: '600',
        dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <CanvasJSChart options={options} />

      {/* Insight */}
      <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm leading-6 text-slate-600">
        <span className="font-bold text-slate-900">Insight:</span> {insight}
      </p>
    </section>
  );
}

export default BarChart;