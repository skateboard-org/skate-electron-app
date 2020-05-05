import { Action } from 'redux';

import { EXECUTION_STARTED, EXECUTION_COMPLETED } from '../actions/actions';

export default function isLoading(state = false, action: Action<string>) {
  switch (action.type) {
    case EXECUTION_STARTED:
      return true;
    case EXECUTION_COMPLETED:
      return false;
    default:
      return state;
  }
}
