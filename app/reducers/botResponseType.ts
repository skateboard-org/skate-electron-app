import { Action } from 'redux';

import {
  EXECUTION_STARTED,
  EXECUTION_COMPLETED,
  EXECUTION_FAILED,
  RESET
} from '../actions/actions';

export default function botResponseType(state = '', action: Action<string>) {
  switch (action.type) {
    case EXECUTION_STARTED: {
      return '';
    }
    case EXECUTION_COMPLETED: {
      if (action.payload.res.success) {
        return action.payload.res.type;
      }
      return '';
    }
    case EXECUTION_FAILED: {
      return '';
    }
    case RESET: {
      return '';
    }
    default:
      return state;
  }
}
