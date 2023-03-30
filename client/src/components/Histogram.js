const Histogram = ({
  histogram,
}) => {
    const createRow = (data) => data?.map(item => (
          <>
            <th></th>
            <td>{item.start}</td>
            <td>{item.end}</td>
            <td>{item.density}</td>
          </>
        )
  );
  console.log('histogram', histogram);
  return(
    <tr>
      {createRow(histogram)}
    </tr>
  )
}
export default Histogram;
