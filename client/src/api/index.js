import axios from 'axios';
  
let url = 'http://localhost:9000/getcrux'

export const query = async (dest_URL) => {
  console.log('destination in api: ', dest_URL);
  let body = {dest_URL};
  try {
    const res = await axios.post(url, body);
    console.log('post res', res)
    return res;
  } catch (e) {
    console.log('error in api: ', e);
  }
};