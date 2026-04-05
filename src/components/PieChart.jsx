import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart({ data }) {
  const conditionCounts = data.reduce((acc, curr) => {
    acc[curr.condition] = (acc[curr.condition] || 0) + 1;
    return acc;
  }, {});

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: { 
      text: "Weather Conditions Distribution", 
      fontColor: "#1f2937", 
      fontWeight: "bold",
      fontSize: 20
    },
    data: [{
      type: "pie",
      showInLegend: true,
      legendText: "{label}",
      toolTipContent: "{label}: <strong>{y}%</strong>",
      indexLabel: "{label} - {y}%",
      indexLabelFontSize: 12,
      dataPoints: Object.entries(conditionCounts).map(([label, count]) => ({
        label,
        y: parseFloat(((count / data.length) * 100).toFixed(2))
      }))
    }]
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PieChart;
