// const lighthouse = require('lighthouse');
const lighthouse = (...args) =>
	import('lighthouse').then(({default: lighthouse}) => lighthouse(...args));
// const chromeLauncher = require('chromeLauncher');
const chromeLauncher = (...args) =>
	import('chromeLauncher').then(({default: chromeLauncher}) => chromeLauncher(...args));
const { END_18F, END_HD } = require('./const');

const chrome = chromeLauncher.launch({chromeFlags: ['--headless']});
const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
const runnerResult = lighthouse(END_18F, options);

// `.report` is the HTML report as a string
// const reportHtml = runnerResult.report;
// fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

chrome.kill();