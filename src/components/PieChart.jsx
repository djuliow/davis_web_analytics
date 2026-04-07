import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart({ data = [] }) {
  // Hitung jumlah per negara (tanpa null/tidak diketahui)
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

  // Sorting dari terbesar ke terkecil
  const sorted = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);

  // Ambil Top 4 + Lainnya
  const topCountries = sorted.slice(0, 4);
  const others = sorted.slice(4);

  const othersCount = others.reduce((sum, [, count]) => sum + count, 0);

  // Warna kontras (tidak terlalu terang)
  const colors = ["#1e3a8a", "#2563eb", "#06b6d4", "#10b981", "#6b7280"];

  const dataPoints = [
    ...topCountries.map(([country, count], index) => ({
      label: country,
      y: count,
      color: colors[index],
    })),
    ...(othersCount > 0
      ? [
          {
            label: "Lainnya",
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
      text: 'Distribusi Negara Teratas',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },

    // ❌ Hilangkan legend default
    legend: {
      enabled: false,
    },

    data: [
      {
        type: 'pie',
        startAngle: 240,

        // 🔥 Perbesar pie
        radius: '80%',

        // 🔥 Geser ke atas supaya tidak kena watermark
        centerY: '45%',

        // 🔥 Label lebih clean
        indexLabel: '{label} ({y})',
        indexLabelFontSize: 12,
        indexLabelFontColor: '#334155',

        toolTipContent: '<b>{label}</b>: {y} judul',

        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      
      {/* 🔥 FIX HEIGHT (WAJIB) */}
      <CanvasJSChart 
        options={options} 
        containerProps={{ height: '360px' }} 
      />

      {/* Insight */}
      <p className="mt-4 text-sm text-gray-600">
        Produksi konten terkonsentrasi di beberapa negara utama, dengan Amerika Serikat mendominasi katalog, diikuti oleh kontributor besar lainnya.
      </p>
    </section>
  );
}

export default PieChart;