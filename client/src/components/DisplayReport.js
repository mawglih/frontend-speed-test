import Single from "./Single";

const DisplayReport = ({
  data
}) => {
// console.log('data in DisplayReports', data);
  return(
    <div className="containerV">
      <Single data={data?.cumulative_layout_shift} name='Cumulative Layout Shift' />
      <Single data={data?.experimental_interaction_to_next_paint} name='Next Paint' />
      <Single data={data?.experimental_time_to_first_byte} name='Time to First Byte' />
      <Single data={data?.first_contentful_paint} name='First Paint' />
      <Single data={data?.first_input_delay} name='Input Delay' />
      <Single data={data?.largest_contentful_paint} name='Largest Paint' />
    </div>
    // <div>
    //   DisplayReports
    // </div>
  )
}
export default DisplayReport;
