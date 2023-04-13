const fetch = (...args) => 	import('node-fetch').then(({default: fetch}) => fetch(...args));
const { PSI_KEY, END_18F, PSI_ENDPOINT, DD_API_KEY } = require('./const');

const tag_array = [
  "brand:{brand}",
  "page_type:{page_type}",
  "device_type:{device_type}",
  "brand:{brand}",
]

module.exports = async function run() {
  const psi_url = `${PSI_ENDPOINT}?key=${PSI_KEY}&url=${END_18F}&category=PERFORMANCE&strategy=MOBILE`;
  const response = await fetch(psi_url);
  const json = await response.json();
  const lighthouse = await json.lighthouseResult.audits;
  const performance =  await json.lighthouseResult.categories;
  const METRICS =  await setMetricsObj(lighthouse,performance);
  console.log('filtered result', lighthouseMetricsFiltered);
  // for(let metric in METRICS){
  //   const numeric_value = metric[numeric_value];
  //   const dd_metric_name = metric[id].replace('-', '_'); 
  //   const dd_full_metric = `google_pagespeed_insights.performance.${dd_metric_name}`
  //  // Send Core Web Vitals to DataDog
  //   datadog.api.Metric.send(metric=dd_full_metric, points=numeric_value, tags=tag_array)
  // }
  return METRICS;
}

function setMetricsObj(data, score) {
  const arr = {
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
  return arr;
}




