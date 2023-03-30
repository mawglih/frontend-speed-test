import { useState, useEffect } from 'react';
import { query } from './api';
import DisplayReport from './components/DisplayReport';
import SelectDestination from './components/SelectDestination';
import Charts from './components/Charts';
import './App.css';
import Table from './components/Table';
import response from './components/data.json';

function App() {
  const [data, setData] = useState({});
  const [destUrl, setDestUrl] = useState('')
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [json, setJson] = useState({});
  console.log('The data', data);
  const handleCrUXData = async (dest) => {
    console.log('dest before api', dest)
    const res = await query(dest);
    console.log('all res in APP: ', res);
    if(res.status === 200) {
      setMessage(res.data.message);
      console.log('status1: ', res.status);
      setError('');
      setData(res.data.data.record.metrics);
      console.log('data received in app', res.data.data.record.metrics);
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

    const arrayMetrics = Object.entries(data);
    console.log('Array of obj', arrayMetrics);

  const handleSearch = (searchData) => {
    console.log('serchdata in App: ', searchData);
    setDestUrl(searchData);
    handleCrUXData(searchData);
  }
  // const lcp = Object.entries(arrayMetrics[5][1]?.histogram);
  useEffect(() => {
    setJson(response);
  }, []);
  return (
    <div className="App">
      <h1>CrUX report</h1>
      <h2>Destination: {destUrl}</h2>
      <h3>{message}</h3>
      <SelectDestination search={(searchData) => handleSearch(searchData)} />
      {data && <DisplayReport data={data} />}
      <hr />
      {data && <Table data={arrayMetrics} />}
      <hr />
      {/* {data && data?.charts?.map((chartData, i) => (
        <Charts chart={chartData} key={i}/>
      ))} */}
      <Charts/>
    </div>
  );
}

export default App;
