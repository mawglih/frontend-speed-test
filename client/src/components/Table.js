import Row from "./Histogram";

const Table = ({
  data,
}) => {
  console.log('data in table', data);
  for(const key in data) {
    console.log(`${key}: ${data[key]}`);
  }
  return(
    <table>
      <tr>
        <th>Metric Name</th>
        <th>Percentiles p75</th>
        <th>Histogram Start</th>
        <th>Histogram End</th>
        <th>Histogram Density</th>
      </tr>
      <tr>

        <Row data={data} />
      </tr>

    </table>
  )
}

export default Table;
