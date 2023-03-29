
const CrUXApiUtil = {};
CrUXApiUtil.API_KEY = API_KEY;
CrUXApiUtil.API_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${CrUXApiUtil.API_KEY}`;
CrUXApiUtil.query = function (requestBody) {
  return fetch(CrUXApiUtil.API_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then(response => response.json()).then(response => {
    if (response.error) {
      return Promise.reject(response);
    }
    return response;
  });
};

CrUXApiUtil.query(requestData)
  .then(response => {
  console.log(response);
}).catch(response => {
  console.error(response);
});
