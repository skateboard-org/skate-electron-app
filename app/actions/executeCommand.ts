import { Dispatch, GetState } from '../reducers/types';
import {
  typesOfBots,
  executeCloudBot,
  executeTerminalBot
} from '../bots/index';

import {
  EXECUTION_COMPLETED,
  EXECUTION_STARTED,
  EXECUTION_TIMED_OUT,
  EXECUTION_FAILED
} from './actions';

const executionDuration = 8 * 1000;
let executionTimer: NodeJS.Timeout | null;
const disableExecutionTimer = () => {
  if (executionTimer !== null) clearTimeout(executionTimer);
  executionTimer = null;
};

const hasTimerTimedOut = () => {
  return executionTimer === null;
};

const executeCommand = (
  botName: string,
  botParam: string,
  responseType: string,
  type: string
) => {
  return function action(dispatch: Dispatch, getState: GetState) {
    const { allBotsDictionary, isLoading } = getState();

    if (isLoading.status === false) {
      dispatch({
        type: EXECUTION_STARTED
      });
    } else {
      return;
    }

    executionTimer = setTimeout(() => {
      console.log('TIMED OUT');
      dispatch({
        type: EXECUTION_TIMED_OUT
      });
      disableExecutionTimer();
    }, executionDuration);

    const handleExecution = (res: any) => {
      if (!hasTimerTimedOut()) {
        disableExecutionTimer();
        return dispatch({
          type: EXECUTION_COMPLETED,
          payload: {
            data: res.data,
            success: res.success,
            responseType
          }
        });
      }
    };

    const handleError = (error: any) => {
      if (!hasTimerTimedOut()) {
        disableExecutionTimer();
        return dispatch({
          type: EXECUTION_FAILED,
          payload: {
            data: error,
            success: false,
            responseType
          }
        });
      }
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
  };
};

export default executeCommand;
