import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart({ data = [] }) {
  // Hitung jumlah per negara
  const countryCounts = data.reduce((counts, title) => {
    if (!title?.country) return counts;

    // Pisahkan jika ada lebih dari 1 negara
    const countries = title.country.split(',');

    countries.forEach((country) => {
      const cleanCountry = country.trim();

      if (cleanCountry) {
        counts[cleanCountry] = (counts[cleanCountry] || 0) + 1;
      }
    });

    return counts;
  }, {});

  // Ambil Top 5 negara
  const dataPoints = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, count]) => ({
      label: country,
      y: count,
    }));

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Top 5 Countries Distribution',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    legend: {
      verticalAlign: 'bottom',
      horizontalAlign: 'center',
      fontSize: 12,
    },
    data: [
      {
        type: 'pie',
        startAngle: 240,
        showInLegend: true,
        toolTipContent: '<b>{label}</b>: {y} titles',
        indexLabel: '{label}',
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

export default PieChart;