import { useState, useEffect } from 'react';
import { query } from './api';
import DisplayReport from './components/DisplayReport';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const dest = 'https://www.1800flowers.com';
  console.log('The data', data);
  const handleCrUXData = async () => {
    const res = await query(dest);
    if(res.status === 200) {
      setData(res.data.data.record.metrics);
      console.log('data received in app', res.data.data.record.metrics);
    } else {
      console.log(res);
    }
  }
  useEffect(() => {
    handleCrUXData();
  }, []);
  return (
    <div className="App">
      <h1>CrUX report</h1>
      {data && <DisplayReport data={data} />}
    </div>
  );
}

export default App;
