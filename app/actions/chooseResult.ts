import { CHOOSE_RESULT } from './actions';

import { GetState, Dispatch } from '../reducers/types';

export default function chooseResult(bot: string, param: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { searchingFor } = getState();

    console.log('CHOOSE_RESULT');
    console.log(bot, param);

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
}
