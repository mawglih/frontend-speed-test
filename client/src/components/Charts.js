import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import response  from "./data.json";

const Charts = () => {
  // const chartOptions = {
  //   title: 'LCP distribution',
  //   legend: { position: 'top', maxLines: 2 },
  //   colors: ["#7dd87d", "#ff6f3c", "#dc2f2f"],
  //   interpolateNulls: false,
  // }
  const chartOptions = {
    title : 'CrUX report on HD',
    vAxis: {title: '%'},
    hAxis: {title: 'Metrics name'},
    seriesType: 'bars',
    legend: { position: 'top', maxLines: 2 },
    colors: ["#7dd87d", "#ff6f3c", "#dc2f2f"],
    series: {5: {type: 'line'}}
  };
  const chartData= [
    [
      'Metric',
      'good',
      'mid',
      'bad'
    ],
    ['largest_contentful_pain',  43.26, 28.07, 28.66],
    ['cumulative_layout_shift',  28.93, 36.91, 35.16],
    ['experimental_interaction_to_next_paint',  47.82, 37.57, 14.60],
    ['experimental_time_to_first_byte', 64.81, 22.81, 12.38],
    ['first_contentful_pain',  88.97, 5.72, 5.31],
    ['first_input_delay',40.61, 18.86, 40.53]
  ];
  const[chart, setChart] = useState(response);
  // useEffect(() => {
  //   setChart(response);
  // }, []);
  console.log('chartData', chart);
  console.log("chartType", chart.charts[0].name)
  return (
    <Chart
      data={chartData}
      options={chartOptions}
      chartType="ComboChart"
      width="100%"
      height="400px"
    />
  )
}
export default Charts;
