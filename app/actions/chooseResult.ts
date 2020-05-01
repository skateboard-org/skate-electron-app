import { CHOOSE_RESULT } from './actions';

import { GetState, Dispatch } from '../reducers/types';

const chooseResult = (bot: string, param: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    const { searchingFor } = getState();

    if (bot) {
      // if (param && param.length > 0) {
      dispatch({
        type: CHOOSE_RESULT,
        payload: {
          searchingFor,
          selectedBot: bot,
          selectedParam: param
        }
      });
    }
    // }
  };
};

export default chooseResult;
