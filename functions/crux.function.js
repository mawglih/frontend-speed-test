const { API_KEY, API_ENDPOINT, END_18F, END_HD } = require('../const');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const origin = process.argv[2] ? process.argv[2] : END_18F;



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

module.exports = async function (origin) {
  const requestData = {
    "origin": `${origin}`,
    "formFactor": "PHONE",
  }
  const json = await CrUXApiUtil.query(requestData, API_KEY);
  console.log('CrUX API response:', json);
  console.log('first input delay', json.record.metrics.first_input_delay);
  return json;
};
