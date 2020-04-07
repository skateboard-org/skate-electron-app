import { Action } from 'redux';

import {
  EXECUTION_STARTED,
  EXECUTION_COMPLETED,
  EXECUTION_FAILED
} from '../actions/actions';

export default function skatePanel(state = [], action: Action<string>) {
  switch (action.type) {
    case EXECUTION_STARTED: {
      return [];
    }
    case EXECUTION_COMPLETED: {
      return action.payload.res || state;
    }
    case EXECUTION_FAILED: {
      return [];
    }
    default:
      return state;
  }
}
