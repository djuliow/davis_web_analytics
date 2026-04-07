import { useMemo } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const COLORS = ['#1e3a8a', '#2563eb', '#06b6d4', '#10b981', '#6b7280'];

function PieChart({ data = [] }) {
  const { dataPoints, insight } = useMemo(() => {
    const countryCounts = data.reduce((counts, title) => {
      if (!title?.country || title.country === 'Unknown') {
        return counts;
      }

      title.country.split(',').forEach((country) => {
        const cleanCountry = country.trim();

        if (cleanCountry && cleanCountry !== 'Unknown') {
          counts[cleanCountry] = (counts[cleanCountry] || 0) + 1;
        }
      });

      return counts;
    }, {});

    const sortedCountries = Object.entries(countryCounts).sort(
      (a, b) => b[1] - a[1],
    );
    const topCountries = sortedCountries.slice(0, 4);
    const othersCount = sortedCountries
      .slice(4)
      .reduce((sum, [, count]) => sum + count, 0);

    const chartDataPoints = [
      ...topCountries.map(([country, count], index) => ({
        label: country,
        y: count,
        color: COLORS[index],
      })),
      ...(othersCount > 0
        ? [
            {
              label: 'Lainnya',
              y: othersCount,
              color: COLORS[4],
            },
          ]
        : []),
    ];

    const [topCountry, topCount] = topCountries[0] || [];
    const secondCountry = topCountries[1]?.[0];
    const chartInsight = topCountry
      ? `${topCountry} menjadi kontributor terbesar dengan ${topCount.toLocaleString()} judul, ${
          secondCountry
            ? `diikuti oleh ${secondCountry} dan negara utama lainnya.`
            : 'menunjukkan konsentrasi produksi yang kuat pada satu pasar utama.'
        }`
      : 'Distribusi negara akan muncul setelah dataset dimuat.';

    return {
      dataPoints: chartDataPoints,
      insight: chartInsight,
    };
  }, [data]);

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Distribusi Negara Teratas',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    legend: {
      enabled: false,
    },
    data: [
      {
        type: 'pie',
        startAngle: 240,
        radius: '80%',
        centerY: '45%',
        indexLabel: '{label} ({y})',
        indexLabelFontSize: 12,
        indexLabelFontColor: '#334155',
        toolTipContent: '<b>{label}</b>: {y} judul',
        dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <CanvasJSChart options={options} containerProps={{ height: '360px' }} />
      <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm leading-6 text-slate-600">
        <span className="font-bold text-slate-900">Insight:</span> {insight}
      </p>
    </section>
  );
}

export default PieChart;
