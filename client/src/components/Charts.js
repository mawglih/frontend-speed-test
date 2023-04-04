import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Charts = ({
  data,
  dest
}) => {

  const [chartData, setChartData] = useState([]);

  const chartHeader = ['Metric', 'good', 'mid', 'bad'];

  const constructChartData = () => {
    if (data) {;
      const obj = {}
      const result = [];
      result.push(chartHeader);
      for (let i in data) {
        let arr = [];
        arr = data[i].histogram.map(x => x.density);
        arr.unshift(i);
        result.push(arr);
      }
      if(dest.length >0) {
        obj.dest = dest;
        obj.data = result;
        setChartData((prev) => ([...prev, obj]));
        console.log('object is', obj )
        return obj;
      }
      return null;
    }
  
  }
  useEffect(() => {
      constructChartData();
  }, [data]);

  return (
    <>
    {chartData.length > 0 && chartData.map((item, idx) => (
         <Chart
          key={idx}
          data={item.data}
          options={{
            title: `CrUX report on ${item.dest}`,
            vAxis: {title: '%'},
            hAxis: {title: 'Metrics name'},
            seriesType: 'bars',
            legend: { position: 'top', maxLines: 2 },
            colors: ["#7dd87d", "#ff6f3c", "#dc2f2f"],
            series: {5: {type: 'line'}}
          }}
          chartType="ComboChart"
          height="400px"
          width="50%"
        />
    ))  

      }
    </>
  )
}
export default Charts;
