import axios from 'axios';

const executeCloudBot = async (
  botName: string,
  botParam: string,
  botUrl: string
) => {
  let param = botParam;
  if (botParam === undefined || botParam.length === 0) {
    param = 'null';
  }
  const data = await axios
    .post(`${botUrl}`, {
      data: {
        botName,
        param
      }
    })
    .then((res: any) => {
      return res.data.result;
    })
    .catch((error: any) => error);
  return data;
};

export default executeCloudBot;
