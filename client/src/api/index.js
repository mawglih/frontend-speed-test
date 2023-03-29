import axios from 'axios';
  
let url = 'http://localhost:9000/getcrux'

export const query = async (dest_URL) => {
  let body = {dest_URL};
  const res = await axios.post(url, body);
  console.log('post res', res)
  return res;
};