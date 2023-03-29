import { useState, useEffect } from 'react';
import { query } from './api';
import './App.css';

function App() {
  const [data, setData] = {};
  const dest = 'https://www.1800flowers.com';
  console.log('The data', data);
  const handleCrUXData = async () => {
    const res = await query(dest);
    if(res.status === 200) {
      setData(res.record);
      console.log('data received in app', res.record);
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
    </div>
  );
}

export default App;
