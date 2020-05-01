import { Action } from 'redux';
import {
  MARK_SEARCH_FOR_BOTS,
  RESET,
  MARK_SEARCH_FOR_PARAMS
} from '../actions/actions';

export default function searchingFor(state = 'bot', action: Action<string>) {
  switch (action.type) {
    case MARK_SEARCH_FOR_BOTS:
      return 'bot';
    case MARK_SEARCH_FOR_PARAMS:
      return 'parameter';
    case RESET: {
      return 'bot';
    }
    default:
      return state;
  }
}
