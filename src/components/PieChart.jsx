import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart({ data }) {
  const ratingCounts = data.reduce((counts, title) => {
    counts[title.rating] = (counts[title.rating] || 0) + 1;
    return counts;
  }, {});

  const dataPoints = Object.entries(ratingCounts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 8)
    .map(([rating, count]) => ({
      label: rating,
      y: count,
    }));

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    theme: 'light2',
    title: {
      text: 'Ratings Distribution',
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
        dataPoints,
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
