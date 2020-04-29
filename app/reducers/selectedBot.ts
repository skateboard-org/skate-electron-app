import { Action } from 'redux';

import { SEARCH_BOTS, CHOOSE_RESULT, RESET } from '../actions/actions';

export default function selectedBot(state = '', action: Action<string>) {
  switch (action.type) {
    case CHOOSE_RESULT:
      if (action.payload.searchingFor === 'bot') {
        return action.payload.selectedBot || state;
      }
      return state;
    case SEARCH_BOTS:
      return '';
    case RESET: {
      return '';
    }
    default:
      return state;
  }
}
