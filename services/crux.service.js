const getData = require('../functions/crux.function');
const {END_18F} = require('../const');

exports.getData = async function(url) {
  if(!url) {
    try {
      let result = await getData(END_18F);
      return result;
    } catch(e) {
      throw Error(`Error fetching data with ${END_18F}`);
    } 
  } else {
    try {
      let result = await getData(url);
      return result;
    } catch(e) {
      throw Error(`Error fetching data with ${url}`)
    }
  }
}
