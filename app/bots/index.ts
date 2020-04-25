import axios from 'axios';

const url = 'http://localhost:3000/api/bot';

export const getAllBots = async () => {
  const allBots = await axios
    .get(`${url}/all`)
    .then((res: any) => {
      if (res.data.success) return res.data.bots;
      throw new Error();
    })
    .catch((error: any) => error);
  return allBots;
};

export const executeBot = async (botName: string, botParam: string) => {
  const data = await axios
    .get(`${url}/exec/${botName}/${botParam}`)
    .then((res: any) => {
      if (res.success) return res.data;
      throw new Error();
    })
    .catch((error: any) => error);
  return data;
};
