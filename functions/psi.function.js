const fetch = (...args) => 	import('node-fetch').then(({default: fetch}) => fetch(...args));
const { PSI_KEY, END_18F, PSI_ENDPOINT } = require('../const');

module.exports = function run(url) {
  const psi_url = `${PSI_ENDPOINT}?key=${PSI_KEY}&url=${url}&category=PERFORMANCE&strategy=MOBILE`;
  fetch(psi_url)
    .then(response => response.json())
    .then(json => {
      const lighthouse = json.lighthouseResult;
      console.log('lh metrics:', lighthouse);
      return lighthouse;
    });
}
