import { Action } from 'redux';

import {
  SEARCH_PARAMETERS,
  SEARCH_BOTS,
  CHOOSE_RESULT,
  RESET,
  EXECUTION_STARTED,
  UNKNOWN_COMMAND
} from '../actions/actions';

export default function searchResult(state = [], action: Action<string>) {
  switch (action.type) {
    case SEARCH_PARAMETERS: {
      const myAllParamNames = action.payload.allParamNames;

      // if (action.payload.searchTerm === '') {
      //   return [];
      // }

      const newArray = myAllParamNames.filter(param =>
        param.includes(action.payload.searchTerm)
      );

      return newArray;
    }
    case SEARCH_BOTS: {
      const myAllBotsNames = action.payload.allBotsNames;

      const newArray = myAllBotsNames.filter(botName =>
        botName.includes(action.payload.searchTerm)
      );

      return newArray;
    }

    case CHOOSE_RESULT: {
      return [];
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
