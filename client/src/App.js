import { useState } from 'react';
import { query, query2, query3 } from './api';
import DisplayReport from './components/DisplayReport';
import SelectDestination from './components/SelectDestination';
import Charts from './components/Charts';
import './App.css';
import LhReport from './components/LhReport';
import PsiReport from './components/PsiReport';

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
  const [lhMetrics, setLHMetrics] = useState({});
  const [psiURL, setPsiURL] = useState('');
  const [psiMessage, setPsiMessage] = useState('');
  const [psiData, setPsiData] = useState([]);
  const [psiError, setPsiError] = useState('');

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
      setLHMetrics(res.data.data.audits.metrics.details.items[0]);
    } else  {
      setLhError(res);
      setLhMessage(res.message);
      console.log(res);
      setLhURL('');
    }
  }

  const METRICS = ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 
    'first-contentful-paint', 'dom-size', 'first-meaningful-paint', 'interactive'];

  const getMetrics = data => {
    let arr = [];
    for (let i in data) {
      if (METRICS.includes(i.id)) {
        arr.push({[i.id]: i});
      }
    }
    console.log('arr in app', arr);
    return arr;
  }

    const handlePsiData = async (dest) => {
    const res = await query3(dest);
    if(res.status === 200) {
      console.log('res in app for psi', res);
      console.log('data in psi 200', res.data.data);
     setPsiMessage(res.data.message);
     setPsiError('');
     setPsiData(res.data.data);
  
    } else  {
     setPsiError(res);
     setPsiMessage(res.message);
      console.log(res);
     setPsiURL('');
    }
  }

  
  const handleSearch = (searchData) => {
    console.log('CrUXdata in App: ', searchData);
    setDestUrl(searchData);
    handleCrUXData(searchData);
  }
  const handleLHSearch = (searchData) => {
    console.log('LHdata in App: ', searchData);
    setLhURL(searchData);
    handleLhData(searchData);
  }
 
  const handlePSISearch = (searchData) => {
    setPsiURL(searchData);
    handlePsiData(searchData);
  }

  return (
    <div className="App">
      <h1>LH Report</h1>
      <h2>Destination: {lhURL}</h2>
      <h3>{lhMessage}</h3>
      <SelectDestination search={(searchData) => handleLHSearch(searchData)}/>
      {lhData && <LhReport data={lhData} perf={lhPerformance} score={lhPerformanceScore} dest={lhURL} metrics={lhMetrics} /> }
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
      <hr/>
           <h1>PSI Report</h1>
      <h2>Destination: {psiURL}</h2>
      <h3>{psiMessage}</h3>
      <SelectDestination search={(searchData) => handlePSISearch(searchData)}/>
      {psiData && <PsiReport data={psiData} dest={psiURL}/> }
      
    </div>
  );
}

export default App;
