const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const lhOptions = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["performance"],
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
        console.log('results after success', results.lhr);
        return results.lhr
      }
      chrome.kill();
    });
}



module.exports = async function runLighthouseAnalysis(destUrl) {
  console.log('url: ', destUrl)
  let results;
  const opts = {
    chromeFlags: ["--no-sandbox", "--headless"]
  };
  const json = await launchLighthouse(lhOptions, opts, results, destUrl);
  return json;
}
