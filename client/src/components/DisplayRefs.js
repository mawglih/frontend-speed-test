const DisplayRefs = ({
  title,
  weight,
  group
}) => {
  return (
      <tr>
        <td>{title}</td>
        <td>{weight}</td>
        <td>{group}</td>
      </tr>
  )
}
export default DisplayRefs;
