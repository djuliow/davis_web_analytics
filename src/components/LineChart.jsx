import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart({ data = [] }) {
  // Hitung jumlah title per tahun (2000–2020 saja)
  const releasesByYear = data.reduce((counts, title) => {
    const year = Number(title?.releaseYear);

    // validasi + filter range tahun
    if (!isNaN(year) && year >= 2000 && year <= 2020) {
      counts[year] = (counts[year] || 0) + 1;
    }

    return counts;
  }, {});

  // Ubah ke format dataPoints CanvasJS
  const dataPoints = Object.entries(releasesByYear)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([year, count]) => ({
      x: Number(year),
      y: count,
    }));

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Titles by Release Year (2000–2020)',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    axisX: {
      title: 'Release Year',
      interval: 5,
      minimum: 2000,
      maximum: 2020,
      labelFontColor: '#64748b',
      titleFontColor: '#475569',
      gridThickness: 0,
    },
    axisY: {
      title: 'Number of Titles',
      labelFontColor: '#64748b',
      titleFontColor: '#475569',
      gridColor: '#e2e8f0',
      tickColor: '#cbd5e1',
    },
    toolTip: {
      cornerRadius: 10,
    },
    data: [
      {
        type: 'line',
        color: '#e11d48',
        lineThickness: 3,
        markerSize: 6,
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <CanvasJSChart options={options} />
    </section>
  );
}

export default LineChart;