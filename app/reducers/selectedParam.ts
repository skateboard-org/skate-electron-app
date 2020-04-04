import { Action } from 'redux';

import {
  CHOOSE_RESULT,
  SEARCH_PARAMETERS,
  SEARCH_BOTS,
  RESET
} from '../actions/actions';

export default function selectedParam(state = '', action: Action<string>) {
  switch (action.type) {
    case CHOOSE_RESULT:
      if (action.payload.searchingFor === 'parameter') {
        return action.payload.selectedResult;
      }
      return state;
    case SEARCH_PARAMETERS:
      return '';
    case SEARCH_BOTS:
      return '';
    case RESET: {
      return '';
    }
    default:
      return state;
  }
}
