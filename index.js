const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');
const router = require(('./routes/crux.route'));
const router2 = require(('./routes/lh.route'));
const router3 = require('./routes/psi.route');
const psi = require('./functions/psi.function');

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

const {API_KEY, API_ENDPOINT, END_18F} = require('./const');
const origin = process.argv[2] ? process.argv[2] : END_18F;

const requestData = {
  "origin": `${origin}`,
  "formFactor": "PHONE",
}



const CrUXApiUtil = {
  query: async function(requestBody, API_KEY) {
    const resp = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    const json = await resp.json()
    if (!resp.ok) throw new Error(json.error.message);
    return json;
  }
};

const data = async function () {
  const json = await CrUXApiUtil.query(requestData, API_KEY);
  // console.log('CrUX API response:', json);
  // console.log('first input delay', json.record.metrics.first_input_delay);
};

data();

app.use('/getcrux', router);
app.use('/getlh', router2);
app.use('/getpsi', router3);

psi(END_18F);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
