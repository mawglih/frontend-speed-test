const lighthouse = require("lighthouse");
// const lighthouse = (...args) =>	import('lighthouse').then(({default: lighthouse}) => lighthouse(...args));
// import lighthouse from 'lighthouse';
const chromeLauncher = require("chrome-launcher");


const lhOptions = {
  extends: "lighthouse:default",
  settings: {
    // onlyAudits: ['first-meaningful-paint','speed-index', 'interactive','estimated-input-latency','total-blocking-time', 'time-to-first-byte'],
    onlyCategories: ['performance'],
    emulatedFormFactor: "mobile",
    output: "json"
  }
}


function launchLighthouse(optionSet, opts, results,url) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(async chrome => {
      opts.port = chrome.port;
      try {
        results = await lighthouse(url, opts, optionSet);
      } catch (e) {
        console.error("lighthouse", e);
      }
      if (results) {
        return results.lhr
      }
      chrome.kill();
    });
}



module.exports = async function runLighthouseAnalysis(destUrl) {
  let results;
  const opts = {
    chromeFlags: ["--no-sandbox", "--headless"]
  };
  const json = await launchLighthouse(lhOptions, opts, results, destUrl);
  return json;
}
