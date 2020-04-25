import axios from 'axios';
import executeTerminalBot from './TerminalBots';
import executeCloudBot from './CloudBots';

const apiUrl = 'http://localhost:3000/api/bot';

enum typesOfBots {
  Cloud = 'cloud',
  Terminal = 'terminal'
}

const getAllBots = async () => {
  const allBots = await axios
    .get(`${apiUrl}/all`)
    .then((res: any) => {
      if (res.data.success) return res.data.bots;
      throw new Error();
    })
    .catch((error: any) => error);
  return allBots;
};

export { getAllBots, executeCloudBot, executeTerminalBot, typesOfBots };
