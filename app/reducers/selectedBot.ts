import { Action } from 'redux';

import { SEARCH_BOTS, STORE_BOT_NAME, RESET } from '../actions/actions';

export default function selectedBot(state = '', action: Action<string>) {
  switch (action.type) {
    case STORE_BOT_NAME:
      return action.payload.selectedBot;
    case SEARCH_BOTS:
      return '';
    case RESET: {
      return '';
    }
    default:
      return state;
  }
}
