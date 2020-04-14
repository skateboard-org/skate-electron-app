import { LOAD_BOT_NAMES, LOAD_BOTS } from './actions';
import allBots from '../skate-apps/bots';
import { setUpWindow } from '../utils/window';

import { GetState, Dispatch } from '../reducers/types';

export default function initState() {
  setUpWindow();
  return (dispatch: Dispatch, getState: GetState) => {
    const { allBotsNames, allBotsDictionary } = getState();
    if (allBotsNames.length < 1) {
      dispatch({ type: LOAD_BOT_NAMES, payload: { allBots } });
    }
    if (allBotsDictionary.size < 1) {
      dispatch({ type: LOAD_BOTS, payload: { allBots } });
    }
  };
}
