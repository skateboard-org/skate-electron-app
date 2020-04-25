import { Action } from 'redux';

import { LOAD_BOTS } from '../actions/actions';

export default function allBotsNames(state = [], action: Action<string>) {
  switch (action.type) {
    case LOAD_BOTS: {
      const { newAllBots } = action.payload;
      return newAllBots.map((bot: any) => bot.name);
    }
    default:
      return state;
  }
}
