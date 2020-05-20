import { Action } from 'redux';
import {
  EXECUTION_TIMED_OUT,
  EXECUTION_STARTED,
  EXECUTION_COMPLETED,
  EXECUTION_FAILED,
  RESET,
  MARK_SEARCH_FOR_BOTS
} from '../actions/actions';

export default function skatePanel(state = [], action: Action<string>) {
  switch (action.type) {
    case EXECUTION_STARTED: {
      return [];
    }
    case EXECUTION_COMPLETED: {
      if (action.payload.success) {
        return action.payload.data;
      }
      return [];
    }
    case EXECUTION_FAILED: {
      return [];
    }
    case EXECUTION_TIMED_OUT: {
      return [];
    }
    case RESET: {
      return [];
    }
    case MARK_SEARCH_FOR_BOTS: {
      return [];
    }
    default:
      return state;
  }
}
