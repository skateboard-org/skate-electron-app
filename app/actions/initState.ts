import { LOAD_BOTS } from './actions';
import { setUpWindow } from '../utils/window';
import { getAllBots } from '../bots/index';

import { GetState, Dispatch } from '../reducers/types';

const initState = () => {
  setUpWindow();

  return (dispatch: Dispatch, getState: GetState) => {
    const { allBotsNames, allBotsDictionary } = getState();
    if (allBotsDictionary.size < 1 || allBotsNames.length < 1) {
      getAllBots()
        .then((bots: any[]) => {
          return dispatch({
            type: LOAD_BOTS,
            payload: { newAllBots: bots }
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
};

export default initState;
