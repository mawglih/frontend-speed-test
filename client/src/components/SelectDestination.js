const { useState } = require("react")

const SelectDestination = ({
  search,
}) => {
  const [data, setData] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    search(data);
    setData('');
  }
  return (
    <div className="inputGroup">
      <form className="inputForm" onSubmit={handleSubmit}>
        <div className="inputField">
        <label htmlFor="website">
          <span>Destination website</span>
          </label>
          <input
            value={data}
            name="website"
            type="text"
            onChange={(e) => setData(e.target.value)}
          />
        
      </div>
      <div className="submitButton">
        <button 
          type="submit"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  )
}

export default SelectDestination;
