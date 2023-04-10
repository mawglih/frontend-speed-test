import { useEffect, useState } from "react";

const PSIReport = ({
  data,
  dest,
  score
}) => {
  const [PSIData, setPSIData] = useState([]);

  console.log('data in PSIReport', data);
  const constructPSIData = () => {
    if(data) {
      const arr = Object.values(data);
      console.log('array is ready', arr);
      setPSIData(arr);
    }
  }

  useEffect(() => {
    constructPSIData();
  }, [data]);
  return (
    <div className="container">
      <div className="content">
        {score && <h2>{dest} score is: {score}</h2>}
      </div>
      {PSIData.length > 0 && <div className="content">
        <table>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Value (ms)</th>
            <th>Score</th>
            </tr>
            {PSIData.map((item) => {
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
    </div>
  )

}
export default PSIReport;
