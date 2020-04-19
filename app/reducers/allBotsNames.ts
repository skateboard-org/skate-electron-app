import { Action } from 'redux';

import { LOAD_BOT_NAMES } from '../actions/actions';

export default function allBotsNames(state = [], action: Action<string>) {
  switch (action.type) {
    case LOAD_BOT_NAMES: {
      const { newAllBotNames } = action.payload;
      return newAllBotNames;
    }
    default:
      return state;
  }
}
