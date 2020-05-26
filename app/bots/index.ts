import axios from 'axios';
import executeTerminalBot from './TerminalBots';
import executeCloudBot from './CloudBots';

import url from './api';

enum typesOfBots {
  Cloud = 'cloud',
  Terminal = 'terminal'
}

const getAllBots = async () => {
  const allBots = await axios
    .post(`${url}/getAllBots`, {
      data: {}
    })
    .then((res: any) => {
      if (!res.data.result.data.error) {
        return res.data.result.data;
      }
      throw new Error();
    })
    .catch((error: any) => error);
  return allBots;
};

export { getAllBots, executeCloudBot, executeTerminalBot, typesOfBots };
