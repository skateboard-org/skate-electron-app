import {
  botStatusMessages,
  paramStatusMessages
} from '../reducers/commandStatus';
import { UPDATE_BOT_STATUS, UPDATE_PARAM_STATUS } from './actions';

import { Dispatch } from '../reducers/types';

const updateCommandStatus = (
  type: 'bot' | 'param',
  status: botStatusMessages | paramStatusMessages
) => {
  return (dispatch: Dispatch) => {
    switch (type) {
      case 'bot':
        dispatch({
          type: UPDATE_BOT_STATUS,
          payload: { status }
        });
        break;
      case 'param':
        dispatch({
          type: UPDATE_PARAM_STATUS,
          payload: { status }
        });
        break;
      default:
        break;
    }
  };
};

export default updateCommandStatus;
