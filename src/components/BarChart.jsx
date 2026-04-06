import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BarChart({ data }) {
  const typeCounts = data.reduce(
    (counts, title) => {
      counts[title.type] = (counts[title.type] || 0) + 1;
      return counts;
    },
    { Movie: 0, 'TV Show': 0 },
  );

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Movies vs TV Shows',
      fontFamily: 'inherit',
      fontSize: 20,
      fontWeight: '600',
    },
    axisY: {
      title: 'Total Titles',
      labelFontColor: '#64748b',
      titleFontColor: '#475569',
      gridColor: '#e2e8f0',
    },
    axisX: {
      labelFontColor: '#64748b',
      tickThickness: 0,
      lineThickness: 0,
    },
    data: [
      {
        type: 'column',
        colorSet: 'netflixBars',
        dataPoints: [
          { label: 'Movie', y: typeCounts.Movie || 0, color: '#f97316' },
          { label: 'TV Show', y: typeCounts['TV Show'] || 0, color: '#0f172a' },
        ],
      },
    ],
  };

  return (
    <section className="rounded-[30px] border border-white/60 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <CanvasJSChart options={options} />
    </section>
  );
}

export default BarChart;
