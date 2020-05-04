import { Action } from 'redux';
import {
  STORE_BOT_NAME,
  SEARCH_PARAMETERS,
  SEARCH_BOTS,
  RESET,
  EXECUTION_STARTED
} from '../actions/actions';

export default function searchResult(state = [], action: Action<string>) {
  switch (action.type) {
    case SEARCH_PARAMETERS: {
      return action.payload.searchResult;
    }
    case SEARCH_BOTS: {
      return action.payload.searchResult;
    }

    case STORE_BOT_NAME: {
      return [];
    }

    case EXECUTION_STARTED: {
      return [];
    }

    case RESET: {
      return [];
    }

    default:
      return state;
  }
}
