import { Action } from 'redux';
import {
  EXECUTION_TIMED_OUT,
  EXECUTION_STARTED,
  EXECUTION_COMPLETED,
  RESET
} from '../actions/actions';

export type isLoadingType = {
  status: boolean;
  didExecutionFail: boolean;
};

export default function isLoading(
  state = { status: false, didExecutionFail: null },
  action: Action<string>
) {
  switch (action.type) {
    case EXECUTION_STARTED:
      return { status: true, didExecutionFail: false };
    case EXECUTION_COMPLETED:
      return { status: false, didExecutionFail: false };
    case EXECUTION_TIMED_OUT:
      return { status: false, didExecutionFail: true };
    case RESET:
      return { status: false, didExecutionFail: null };
    default:
      return state;
  }
}
