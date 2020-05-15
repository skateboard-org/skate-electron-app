import axios from 'axios';
import executeTerminalBot from './TerminalBots';
import executeCloudBot from './CloudBots';
import executeScriptBot from './ScriptBots';

import url from './api';

enum typesOfBots {
  Cloud = 'cloud',
  Terminal = 'terminal',
  Script = 'script'
}

const getAllBots = async () => {
  const allBots = await axios
    .get(`${url}/bot/all`)
    .then((res: any) => {
      if (res.data.success) return res.data.bots;
      throw new Error();
    })
    .catch((error: any) => error);
  return allBots;
};

export {
  getAllBots,
  executeCloudBot,
  executeTerminalBot,
  executeScriptBot,
  typesOfBots
};
