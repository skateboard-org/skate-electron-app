import { Response } from '../skate-apps/types';
import { Dispatch, GetState } from '../reducers/types';

import {
  EXECUTION_COMPLETED,
  EXECUTION_STARTED,
  EXECUTION_FAILED
} from './actions';

import commandMapper from '../skate-apps/commandMapper';

export default function executeCommand(
  botName: string,
  botParam: string,
  responseType: string
) {
  return function action(dispatch: Dispatch) {
    dispatch({
      type: EXECUTION_STARTED
    });

    const app = commandMapper(botName);

    app(botParam)
      .then((res: Response) => {
        console.log(res);
        if (res.success) {
          return dispatch({
            type: EXECUTION_COMPLETED,
            payload: {
              data: res.data,
              success: res.success,
              responseType
            }
          });
        }
        return dispatch({
          type: EXECUTION_FAILED,
          payload: {
            data: res.data,
            success: res.success,
            responseType
          }
        });
      })
      .catch((error: any) => {
        console.log(error);
        return dispatch({
          type: EXECUTION_FAILED
        });
      });
  };
}
