const cruxService = require('../services/crux.service');

exports.postData = async function (req, res, next) {
  const { dest_URL } = req.body;
  console.log('controller url', dest_URL);
  if(dest_URL == '') {
    let message = 'Empty destination url provided';
    return res.status(220).json({ status: 220, message })
  } else {
    try {
      let result = await cruxService.getData(dest_URL);
      return res.status(200).json({ status: 200, data: result, message: 'CrUX Data available'});
    } catch(e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

}
