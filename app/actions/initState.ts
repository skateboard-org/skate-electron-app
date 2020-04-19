import path from 'path';
import { LOAD_BOT_NAMES, LOAD_BOTS } from './actions';
import { setUpWindow } from '../utils/window';
import jsonReader from '../utils/json-reader';
import bots from '../skate-apps/bots.json';

import { GetState, Dispatch } from '../reducers/types';

export default function initState() {
  setUpWindow();

  return (dispatch: Dispatch, getState: GetState) => {
    const { allBotsNames, allBotsDictionary } = getState();
    if (allBotsNames.length < 1) {
      const newAllBotNames = Object.keys(bots);
      dispatch({ type: LOAD_BOT_NAMES, payload: { newAllBotNames } });
    }
    if (allBotsDictionary.size < 1) {
      const botKeys = Object.keys(bots);
      const newAllBotsPromises = botKeys.map(botKey => {
        const botPath = path.join(
          __dirname,
          '..',
          `app/skate-apps/${botKey}/bot.json`
        );

        const botInfo = jsonReader(botPath);
        return botInfo;
      });

      Promise.all(newAllBotsPromises)
        .then(newAllBots => {
          return dispatch({ type: LOAD_BOTS, payload: { newAllBots } });
        })
        .catch(error => console.log(error));
    }
  };
}
