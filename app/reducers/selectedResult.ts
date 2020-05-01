import { Action } from 'redux';
import { RESET, UPDATE_SELECTED_RESULT } from '../actions/actions';

export default function selectedResult(state = '', action: Action<string>) {
  switch (action.type) {
    case UPDATE_SELECTED_RESULT: {
      return action.payload.newSelectedResult;
    }

    case RESET: {
      return '';
    }

    default:
      return state;
  }
}
