import { Action } from 'redux';

import { LOAD_BOT_NAMES } from '../actions/actions';

export default function allBotsNames(state = [], action: Action<string>) {
  switch (action.type) {
    case LOAD_BOT_NAMES: {
      const myAllBotsNames: Array<string> = [];
      const { allBots } = action.payload;
      allBots.forEach(bot => {
        myAllBotsNames.push(String(bot.name));
      });
      return myAllBotsNames;
    }
    default:
      return state;
  }
}
