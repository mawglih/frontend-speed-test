import axios from 'axios';
  
let url = 'http://localhost:9000/getcrux'

export const query = async (dest_URL) => {
  let body = {dest_URL};
  try {
    const res = await axios.post(url, body);
    return res;
  } catch (e) {
    console.log('error in api: ', e);
  }
};