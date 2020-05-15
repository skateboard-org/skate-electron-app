import { Dispatch, GetState } from '../reducers/types';
import {
  typesOfBots,
  executeCloudBot,
  executeScriptBot,
  executeTerminalBot
} from '../bots/index';

import {
  EXECUTION_COMPLETED,
  EXECUTION_STARTED,
  EXECUTION_FAILED
} from './actions';

const executeCommand = (
  botName: string,
  botParam: string,
  responseType: string,
  type: string
) => {
  return function action(dispatch: Dispatch, getState: GetState) {
    const { allBotsDictionary, isLoading } = getState();

    if (isLoading === false) {
      dispatch({
        type: EXECUTION_STARTED
      });
    } else {
      return;
    }

    const handleExecution = (res: any) => {
      return dispatch({
        type: EXECUTION_COMPLETED,
        payload: {
          data: res.data,
          success: res.success,
          responseType
        }
      });
    };

    const handleError = (error: any) => {
      return dispatch({
        type: EXECUTION_FAILED,
        payload: {
          data: error,
          success: false,
          responseType
        }
      });
    };

    if (type === typesOfBots.Cloud) {
      executeCloudBot(botName, botParam)
        .then(handleExecution)
        .catch(handleError);
    }
    if (type === typesOfBots.Terminal) {
      const { terminalCommandTemplate } = allBotsDictionary.get(botName);
      executeTerminalBot(terminalCommandTemplate, botParam)
        .then(handleExecution)
        .catch(handleError);
    }
    if (type === typesOfBots.Script) {
      const botSource = 'http://localhost:4000/bot/add';
      executeScriptBot(botName, botParam, botSource)
        .then(handleExecution)
        .catch(handleError);
    }
  };
};

export default executeCommand;
