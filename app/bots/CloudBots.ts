import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/bot';

const executeCloudBot = async (botName: string, botParam: string) => {
  const data = await axios
    .get(`${apiUrl}/exec/${botName}/${botParam}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => error);
  return data;
};

export default executeCloudBot;
