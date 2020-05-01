import { Action } from 'redux';

import {
  SEARCH_PARAMETERS,
  SEARCH_BOTS,
  RESET,
  EXECUTION_STARTED,
  UNKNOWN_COMMAND
} from '../actions/actions';

export default function searchResult(state = [], action: Action<string>) {
  switch (action.type) {
    case SEARCH_PARAMETERS: {
      return action.payload.searchResult;
    }
    case SEARCH_BOTS: {
      return action.payload.searchResult;
    }

    case EXECUTION_STARTED: {
      return [];
    }

    case UNKNOWN_COMMAND: {
      return [];
    }
    case RESET: {
      return [];
    }

    default:
      return state;
  }
}
