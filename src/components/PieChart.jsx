import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart({ data = [] }) {
  // Hitung jumlah per negara (tanpa null/unknown)
  const countryCounts = data.reduce((counts, title) => {
    if (!title?.country || title.country === "Unknown") return counts;

    const countries = title.country.split(',');

    countries.forEach((country) => {
      const cleanCountry = country.trim();

      if (cleanCountry && cleanCountry !== "Unknown") {
        counts[cleanCountry] = (counts[cleanCountry] || 0) + 1;
      }
    });

    return counts;
  }, {});

  // Sorting + ambil Top 4
  const sorted = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);

  const topCountries = sorted.slice(0, 4);
  const others = sorted.slice(4);

  // Hitung Others
  const othersCount = others.reduce((sum, [, count]) => sum + count, 0);

  // Warna custom (lebih profesional)
  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#6b7280"];

  const dataPoints = [
    ...topCountries.map(([country, count], index) => ({
      label: country,
      y: count,
      color: colors[index],
    })),
    ...(othersCount > 0
      ? [
          {
            label: "Others",
            y: othersCount,
            color: colors[4],
          },
        ]
      : []),
  ];

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Top Countries Distribution',
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
        indexLabel: '{label} ({y})',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <CanvasJSChart options={options} />

      {/* Insight */}
      <p className="mt-4 text-sm text-gray-600">
        Content production is concentrated in a few key countries, with the United States dominating the catalog, followed by other major contributors.
      </p>
    </section>
  );
}

export default PieChart;