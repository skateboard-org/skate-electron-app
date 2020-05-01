import {
  SEARCH_BOTS,
  SEARCH_PARAMETERS,
  UPDATE_BOT_STATUS,
  UPDATE_PARAM_STATUS
} from './actions';

import { GetState, Dispatch } from '../reducers/types';

import {
  botStatusMessages,
  paramStatusMessages
} from '../reducers/commandStatus';

const search = (
  type: 'bots' | 'params',
  searchTerm: string,
  searchSpace: string[]
) => {
  return (dispatch: Dispatch, getState: GetState) => {
    const searchResult = searchSpace.filter(item => item.includes(searchTerm));

    switch (type) {
      case 'bots': {
        if (searchResult.length === 0) {
          dispatch({
            type: UPDATE_BOT_STATUS,
            payload: { status: botStatusMessages.BotNotFound }
          });
        } else if (searchResult.length > 1) {
          dispatch({
            type: UPDATE_BOT_STATUS,
            payload: { status: botStatusMessages.NoExactMatch }
          });
        }
        dispatch({
          type: SEARCH_BOTS,
          payload: { searchResult }
        });
        break;
      }
      case 'params': {
        if (searchResult.length === 0) {
          dispatch({
            type: UPDATE_PARAM_STATUS,
            payload: { status: paramStatusMessages.ParamNotFoundInOptions }
          });
        } else if (searchResult.length > 1) {
          dispatch({
            type: UPDATE_PARAM_STATUS,
            payload: { status: paramStatusMessages.NoExactMatch }
          });
        }
        dispatch({
          type: SEARCH_PARAMETERS,
          payload: { searchResult }
        });
        break;
      }
      default:
        break;
    }
  };
};

export default search;
