import { useEffect, useState } from "react";

const LhReport = ({
  data,
  score,
  dest,
  metrics,
}) => {
  console.log('data in display lh', data);
  console.log('arr data in lh', Object.values(data));
  const [lhData, setLHData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);

  const constructLHData = () => {
    if(data) {
      const arr = Object.values(data);
      console.log('array is ready', arr);
      setLHData(arr);
    }
  }
    const constructMetricsData = () => {
    if(metrics) {
      const arr = Object.entries(metrics);
      console.log('array is ready', arr);
      setMetricsData(arr.slice(0,10));
    }
  }

  useEffect(() => {
    constructLHData();
    constructMetricsData()
  }, [data, metrics]);

  console.log('lhdata is finally', lhData);
  console.log('metrics in LH finally', metricsData);

  return (
    <div className="container">
      <div className="content">
        {score && <h2>{dest} score is: {score}</h2>}
      </div>
      {lhData.length > 0 && <div className="content">
        <table>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Value (ms)</th>
            <th>Score</th>
            </tr>
            {lhData.map((item) => {
              return(
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.numericValue}</td>
                  <td>{item.score}</td>
                </tr>
              )
            })}
        </table>
      </div>}
      {metricsData.length > 0 && (
      <div className="content">
        <h3>Metrics and values</h3>
        <table>
          <tr>
            <th>Metric name</th>
            <th>Metric value</th>
          </tr>
            {metricsData.map((item) => {
              return(
                <tr>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              )
            })}         
        </table>
      </div>
    )}
    </div>
  )

}
export default LhReport;
