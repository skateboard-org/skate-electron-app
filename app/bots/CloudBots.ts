import axios from 'axios';
import url from './api';

const executeCloudBot = async (botName: string, botParam: string) => {
  let param = botParam;
  if (botParam === undefined || botParam.length === 0) {
    param = 'null';
  }
  const data = await axios
    .get(`${url}/bot/exec/${botName}/${param}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => error);
  return data;
};

export default executeCloudBot;
