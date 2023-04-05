import { useState } from 'react';
import { query, query2 } from './api';
import DisplayReport from './components/DisplayReport';
import SelectDestination from './components/SelectDestination';
import Charts from './components/Charts';
import './App.css';

const END_18F = 'https://www.1800flowers.com';

function App() {
  const [data, setData] = useState({});
  const [destUrl, setDestUrl] = useState('')
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [displUrl,setDisplUrl] = useState('');

  const handleLHData = async () => {
    const res = await query2(END_18F);
    console.log('LH resolved', res);
  }

  const handleCrUXData = async (dest) => {
    const res = await query(dest);
    console.log('all res in APP: ', res);
    if(res.status === 200) {
      setMessage(res.data.message);
      console.log('status1: ', res.status);
      setError('');
      setData(res.data.data.record.metrics);
      setDisplUrl(dest);
      setDestUrl('');
    } else if(res.status === 220) {
      console.log('status2: ', res.status);
      console.log('status 220', res);
      setMessage(res.data.message);
      setDestUrl('');
    } else {
      console.log('status3: ', res.status);
      setError(res);
      setMessage(res.message);
      console.log(res);
      setDestUrl('');
    }
  }

  const handleSearch = (searchData) => {
    console.log('serchdata in App: ', searchData);
    setDestUrl(searchData);
    handleCrUXData(searchData);
  }
 
  return (
    <div className="App">
      <h1>LH Report</h1>
      <div>
        <button onClick={handleLHData}>Get LH report</button>
      </div>
      <h1>CrUX report</h1>
      <h2>Destination: {displUrl}</h2>
      <h3>{message}</h3>
      <SelectDestination search={(searchData) => handleSearch(searchData)} />
      {data && <DisplayReport data={data} />}
      <hr />
      <div className="chartsContent">
        {data && <Charts data={data} dest={displUrl} />}
      </div>
    </div>
  );
}

export default App;
