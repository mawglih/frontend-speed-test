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
        {PSIData.length > 0 && <h2>{dest} score is: {PSIData.filter(item => item.id === 'performance').map(it=> it.score) * 100}</h2>}
      </div>
      {PSIData.length > 0 && <div className="content">
        <table>
          <tr>
            <th>Title</th>
            <th>Numeric Unit</th>
            <th>Value</th>
            <th>Score</th>
            </tr>
            {PSIData.map((item) => {
              if(item.id !== 'performance') {
                return(
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.numericUnit}</td>
                    <td>{item.numericValue}</td>
                    <td>{item.score}</td>
                  </tr>
                )
              }
            })}
        </table>
      </div>}
    </div>
  )

}
export default PSIReport;
