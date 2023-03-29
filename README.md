Need to add in the root of project const.js

const API_KEY = 'google api key for CrUX';
const ENDPOINT = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord?key';
const END_18F = 'https://www.1800flowers.com';
const END_HD = 'https://www.harryanddavid.com/';

const API_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;

exports.API_KEY = API_KEY;
exports.API_ENDPOINT = API_ENDPOINT;
exports.END_18F = END_18F;
exports.GS_ID = GS_ID;