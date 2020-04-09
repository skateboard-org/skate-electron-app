import { Dispatch, GetState } from '../reducers/types';

import {
  EXECUTION_COMPLETED,
  EXECUTION_STARTED,
  EXECUTION_FAILED
} from './actions';

import commandMapper from '../skate-apps/commandMapper';

export default function executeCommand(botName: string, botParam: string) {
  return function action(dispatch: Dispatch, getState: GetState) {
    dispatch({
      type: EXECUTION_STARTED
    });

    const app = commandMapper(botName);

    app(botParam)
      .then(res => {
        console.log(res);
        if (res.success) {
          return dispatch({
            type: EXECUTION_COMPLETED,
            payload: { res: res || {} }
          });
        }
        return dispatch({
          type: EXECUTION_FAILED,
          payload: { res: res || {} }
        });
      })
      .catch(error => {
        console.log(error);
        return dispatch({
          type: EXECUTION_FAILED
        });
      });
  };
}
