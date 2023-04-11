const fetch = (...args) => 	import('node-fetch').then(({default: fetch}) => fetch(...args));
const { PSI_KEY, END_18F, PSI_ENDPOINT } = require('../const');

module.exports = async function run(url) {
  const psi_url = `${PSI_ENDPOINT}?key=${PSI_KEY}&url=${url}&category=PERFORMANCE&strategy=MOBILE`;
  const response = await fetch(psi_url);
  const json = await response.json();
  const lighthouse = await json.lighthouseResult.audits;
  const performance =  await json.lighthouseResult.categories;
  const lighthouseMetricsFiltered =  await setMetricsObj(lighthouse,performance);
  // console.log('performance', performance);
  return lighthouseMetricsFiltered;
  // return lighthouse;
}

function setMetricsObj(data, score) {
  const obj =   {
    'First Contentful Paint': data['first-contentful-paint'],
    'Speed Index': data['speed-index'],
    'Time To Interactive': data['interactive'],
    'First Meaningful Paint': data['first-meaningful-paint'],
    'DOM size': data['dom-size'],
    'Cumulative Layout Shift': data['cumulative-layout-shift'],
    'Duplicated JavaScript': data['duplicated-javascript'],
    'Largest Contentful Paint': data['largest-contentful-paint'],
    'Total Blocking Time': data['total-blocking-time'],
    'Performance': score['performance']
  };
  return obj;
}