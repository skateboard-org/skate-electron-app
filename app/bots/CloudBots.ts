import axios from 'axios';

const apiUrl = 'https://us-central1-skate-board.cloudfunctions.net/default/api';

const executeCloudBot = async (botName: string, botParam: string) => {
  const data = await axios
    .get(`${apiUrl}/bot/exec/${botName}/${botParam}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => error);
  return data;
};

export default executeCloudBot;
