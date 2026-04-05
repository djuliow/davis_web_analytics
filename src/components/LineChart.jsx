import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart({ data }) {
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: { 
      text: "Temperature Trend Over Time", 
      fontColor: "#1f2937", 
      fontWeight: "bold",
      fontSize: 20
    },
    axisY: { 
      title: "Temperature (C)", 
      includeZero: false,
      gridThickness: 0.5
    },
    axisX: { 
      title: "Timeline",
      labelFontSize: 12
    },
    data: [{
      type: "line",
      color: "#3b82f6",
      xValueType: "dateTime",
      dataPoints: data.map(d => ({ x: d.date, y: d.temperature }))
    }]
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default LineChart;
