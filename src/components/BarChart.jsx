import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BarChart({ data }) {
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: { 
      text: "Daily Temperature Comparison (Sampled)", 
      fontColor: "#1f2937", 
      fontWeight: "bold",
      fontSize: 20
    },
    axisY: { 
      title: "Temperature (C)",
      gridThickness: 0.5
    },
    axisX: {
      labelAngle: -45,
      labelFontSize: 10
    },
    data: [{
      type: "column",
      color: "#f97316",
      dataPoints: data.slice(0, 15).map(d => ({ label: d.date.toLocaleDateString(), y: d.temperature }))
    }]
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default BarChart;
