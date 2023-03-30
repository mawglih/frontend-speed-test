import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import response  from "./data.json";
const Charts = () => {
  const[chart, setChart] = useState(false);
  useEffect(() => {
    setChart(response);
  }, []);
  // console.log('chartData', chart);
  // console.log("chartType", chart.charts[0].name)
  return (
    <Chart
      chartType={chart.charts[0].chartType}
      data={chart.charts[0].data}
      options={chart.charts[0].options}
      width={chart.charts[0].width}
      height={chart.charts[0].height}
    />
  )
}
export default Charts;
