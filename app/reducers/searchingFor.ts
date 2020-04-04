import { Action } from 'redux';
import {
  CHOOSE_RESULT,
  SEARCH_PARAMETERS,
  SEARCH_BOTS,
  RESET
} from '../actions/actions';

export default function searchingFor(state = 'bot', action: Action<string>) {
  switch (action.type) {
    case CHOOSE_RESULT:
      if (state === 'bot') {
        return 'parameter';
      }
      return '';
    case SEARCH_PARAMETERS:
      return 'parameter';
    case SEARCH_BOTS:
      return 'bot';
    case RESET: {
      return 'bot';
    }
    default:
      return state;
  }
}
