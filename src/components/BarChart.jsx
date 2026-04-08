import { useMemo } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Warna gradasi (lebih clean & profesional)
const BAR_COLORS = [
  '#60a5fa',
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#38bdf8',
  '#0ea5e9',
  '#22d3ee',
  '#06b6d4',
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
    theme: 'dark2',
    title: {
      text: 'Distribusi Genre Teratas',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    axisX: {
      labelFontColor: '#cbd5e1',
      labelFontSize: 12,
      labelMaxWidth: 170,
      tickThickness: 0,
      lineThickness: 0,
    },
    axisY: {
      title: 'Jumlah Judul',
      includeZero: true,
      labelFontColor: '#94a3b8',
      titleFontColor: '#cbd5e1',
      gridColor: '#334155',
    },
    toolTip: {
      content: '<b>{label}</b>: {y} judul',
      cornerRadius: 10,
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{indexLabel}',
        indexLabelFontColor: '#f8fafc',
        indexLabelFontWeight: '600',
        dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-slate-800 bg-slate-900/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur sm:p-6">
      <CanvasJSChart options={options} />

      {/* Insight */}
      <p className="mt-5 rounded-2xl bg-slate-800/50 px-4 py-3 text-sm leading-6 text-slate-300">
        <span className="font-bold text-rose-400">Insight:</span> {insight}
      </p>
    </section>
  );
}

export default BarChart;