import { Action } from 'redux';
import { LOAD_BOTS, LOADING_BOTS } from '../actions/actions';

export type isInitialisingType = {
  status: boolean;
  lastUpdateTime: Date;
};

export default function isInitialising(
  state = { status: false, lastUpdateTime: null },
  action: Action<string>
) {
  switch (action.type) {
    case LOADING_BOTS:
      return { status: true, lastUpdateTime: state.lastUpdateTime };
    case LOAD_BOTS:
      return { status: false, lastUpdateTime: new Date() };
    default:
      return state;
  }
}
