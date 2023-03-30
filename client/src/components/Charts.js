import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import response  from "./data.json";

const Charts = () => {
  const[chart, setChart] = useState(response);
  // useEffect(() => {
  //   setChart(response);
  // }, []);
  console.log('chartData', chart);
  console.log("chartType", chart.charts[0].name)
  return (
    <Chart
      chartType={chart?.charts[0]?.chartType}
      data={chart?.charts[0]?.data}
      options={chart?.charts[0]?.options}
      width="100%"
      height="400px"
    />
  )
}
export default Charts;
