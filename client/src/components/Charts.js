import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Charts = ({
  data,
  dest
}) => {

  const [chartData, setChartData] = useState([]);
  const chartOptions = {
    title : `CrUX report on ${dest}`,
    vAxis: {title: '%'},
    hAxis: {title: 'Metrics name'},
    seriesType: 'bars',
    legend: { position: 'top', maxLines: 2 },
    colors: ["#7dd87d", "#ff6f3c", "#dc2f2f"],
    series: {5: {type: 'line'}}
  };

  const chartHeader = ['Metric', 'good', 'mid', 'bad'];

  const constructChartData = () => {
    if (data) {;
        const result = [];
        result.push(chartHeader);
        for (let i in data) {
          let arr = [];
          arr = data[i].histogram.map(x => x.density);
          arr.unshift(i);
          result.push(arr);
        }
        setChartData(result);
        return result;
    }
  
  }
  useEffect(() => {
      constructChartData();
  }, [data]);

  return (
    <>
    {chartData.length > 1 && (
      <Chart
      data={chartData}
      options={chartOptions}
      chartType="ComboChart"
      width="100%"
      height="400px"
    />
    )}
    </>
  )
}
export default Charts;
