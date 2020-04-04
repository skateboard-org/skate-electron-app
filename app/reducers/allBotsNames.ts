import { Action } from 'redux';
import allBots from '../data/bots';

import { LOAD_BOT_NAMES } from '../actions/actions';

export default function allBotsNames(state = [], action: Action<string>) {
  switch (action.type) {
    case LOAD_BOT_NAMES: {
      const myAllBotsNames: Array<string> = [];
      allBots.forEach(bot => {
        myAllBotsNames.push(String(bot.name));
      });
      return myAllBotsNames;
    }
    default:
      return state;
  }
}
