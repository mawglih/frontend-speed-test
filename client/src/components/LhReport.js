const LhReport = ({
  data,
  score,
  perf,
}) => {
  console.log('data in display lh', data);
  console.log('arr data in lh', Object.values(data));

  return (
    <div className="container">

      <div className="content">
        <table>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Value (ms)</th>
            <th>Score</th>
            </tr>
            {Object.values(data).map((item) => {
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
      </div>
    </div>
  )

}
export default LhReport;
