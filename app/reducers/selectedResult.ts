import { Action } from 'redux';
import {
  FIRST_RESULT,
  NEXT_RESULT,
  PREVIOUS_RESULT,
  CHOOSE_RESULT,
  RESET
} from '../actions/actions';

export default function selectedResult(state = '', action: Action<string>) {
  switch (action.type) {
    case FIRST_RESULT: {
      const mySearchResult = action.payload.searchResult;
      if (mySearchResult.length > 0) {
        return mySearchResult[0];
      }
      return state;
    }
    case NEXT_RESULT: {
      const mySearchResult = action.payload.searchResult;
      if (mySearchResult.length === 0) {
        return state;
      }
      const index = mySearchResult.indexOf(state);
      const nextIndex = index === -1 ? 0 : index + 1;
      if (nextIndex <= mySearchResult.length - 1) {
        return mySearchResult[nextIndex];
      }
      return mySearchResult[0];
    }
    case PREVIOUS_RESULT: {
      const mySearchResult = action.payload.searchResult;
      if (mySearchResult.length === 0) {
        return state;
      }
      const index = mySearchResult.indexOf(state);
      const nextIndex = index === -1 ? mySearchResult.length - 1 : index - 1;
      if (nextIndex >= 0) {
        return mySearchResult[nextIndex];
      }
      return mySearchResult[mySearchResult.length - 1];
    }

    case CHOOSE_RESULT: {
      return '';
    }

    case RESET: {
      return '';
    }

    default:
      return state;
  }
}
