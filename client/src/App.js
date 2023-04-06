import { useState } from 'react';
import { query, query2 } from './api';
import DisplayReport from './components/DisplayReport';
import SelectDestination from './components/SelectDestination';
import Charts from './components/Charts';
import './App.css';
import LhReport from './components/LhReport';

const END_18F = 'https://www.1800flowers.com';

function App() {
  const [data, setData] = useState({});
  const [destUrl, setDestUrl] = useState('')
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [displUrl,setDisplUrl] = useState('');
  const [lhURL, setLhURL] = useState('');
  const [lhMessage, setLhMessage] = useState('');
  const [lhError, setLhError] = useState('');
  const [lhData, setLhData] = useState([]);
  const [lhPerformanceScore, setLhPerformanceScore] = useState();
  const [lhPerformance, setLhPerformance] = useState([]);

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
  const handleLhData = async (dest) => {
    const res = await query2(dest);
    if(res.status === 200) {
      console.log('res in app', res);
      console.log('data in lh 200', res.data.data);
      setLhMessage(res.data.message);
      setLhError('');
      setLhData(res.data.data.audits);
      setLhPerformanceScore(Math.round(res.data.data.categories.performance.score * 100));
      setLhPerformance(res.data.data.categories.performance.auditRefs);
    } else  {
      setLhError(res);
      setLhMessage(res.message);
      console.log(res);
      setLhURL('');
    }
  }

  const handleSearch = (searchData) => {
    console.log('serchdata in App: ', searchData);
    setDestUrl(searchData);
    handleCrUXData(searchData);
  }
  const handleLHSearch = (searchData) => {
    console.log('serchdata in App: ', searchData);
    setLhURL(searchData);
    handleLhData(searchData);
  }
 
  return (
    <div className="App">
      <h1>LH Report</h1>
      <h2>Destination: {lhURL}</h2>
      <h3>{lhMessage}</h3>
      <SelectDestination search={(searchData) => handleLHSearch(searchData)}/>
      {lhData && <LhReport data={lhData} perf={lhPerformance} score={lhPerformanceScore} dest={lhURL}/> }
      {/* <div>
        <button onClick={handleLHData}>Get LH report</button>
      </div> */}
      <hr />
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
