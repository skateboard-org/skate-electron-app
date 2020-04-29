import axios from 'axios';
import executeTerminalBot from './TerminalBots';
import executeCloudBot from './CloudBots';

import serverConstants from '../constants/server.json';

enum typesOfBots {
  Cloud = 'cloud',
  Terminal = 'terminal'
}

const getAllBots = async () => {
  const allBots = await axios
    .get(`${serverConstants.devApiUrl}/bot/all`)
    .then((res: any) => {
      if (res.data.success) return res.data.bots;
      throw new Error();
    })
    .catch((error: any) => error);
  return allBots;
};

export { getAllBots, executeCloudBot, executeTerminalBot, typesOfBots };
