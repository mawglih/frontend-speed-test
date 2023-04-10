const getData = require('../functions/psi.function');
const {END_18F} = require('../const');

exports.getData = async function(url) {
  try {
    console.log('url in service', url);
    let result = await getData(url);
    return result;
  } catch(e) {
    throw Error(`Error fetching data with ${url}`)
  }
}
