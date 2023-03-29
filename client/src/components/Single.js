const Single = ({
  data,
  name,
}) => {
  // const {histogram, percentile } = data;
  console.log('Single histogram', data);
  return (
    <div className="single">
      <h2>{name}</h2>
      <div>
        <h3>Percentiles p75: {data?.percentiles?.p75}</h3>
        <h4></h4>
        <h3>Histogram</h3>
        <table>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Density</th>
          </tr>
          {data?.histogram?.map(el => {
            return(
              <tr>
                <td>{el.start}</td>
                <td>{el.end}</td>
                <td>{el.density}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default Single;
