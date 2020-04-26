import { Action } from 'redux';

import { EXECUTION_STARTED, EXECUTION_COMPLETED } from '../actions/actions';

export default function isLoading(state = 'idle', action: Action<string>) {
  switch (action.type) {
    case EXECUTION_STARTED:
      return 'running';
    case EXECUTION_COMPLETED:
      return 'idle';
    default:
      return state;
  }
}
