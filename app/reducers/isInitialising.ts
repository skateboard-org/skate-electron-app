import { Action } from 'redux';
import {
  LOADING_TIME_ELAPSED,
  LOAD_BOTS,
  LOADING_BOTS,
  LOADING_FAILED
} from '../actions/actions';

export type isInitialisingType = {
  status: boolean;
  lastUpdateTime: Date;
  didInitialisingFail: boolean;
};

export default function isInitialising(
  state = {
    status: false,
    lastUpdateTime: null,
    didInitialisingFail: null
  },
  action: Action<string>
) {
  const onSuccess = () => {
    return {
      status: false,
      lastUpdateTime: new Date(),
      didInitialisingFail: false
    };
  };

  const onFailure = () => {
    return {
      status: false,
      lastUpdateTime: state.lastUpdateTime,
      didInitialisingFail: true
    };
  };

  const onInit = () => {
    return {
      status: true,
      lastUpdateTime: state.lastUpdateTime,
      didInitialisingFail: null
    };
  };

  switch (action.type) {
    case LOADING_BOTS:
      return onInit();
    case LOADING_TIME_ELAPSED:
      if (state.status === true) {
        return onFailure();
      }
      // WHATS THE POINT OF THIS ELSE CASE
      return onSuccess();
    case LOAD_BOTS:
      return onSuccess();
    case LOADING_FAILED:
      return onFailure();
    default:
      return state;
  }
}
