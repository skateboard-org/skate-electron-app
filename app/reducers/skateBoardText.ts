import { Action } from 'redux';
import { RESET, UPDATE_SKATEBOARD_TEXT } from '../actions/actions';

export default function skateBoardText(state = '', action: Action<string>) {
  switch (action.type) {
    case UPDATE_SKATEBOARD_TEXT:
      return action.payload.newText;
    case RESET: {
      return '';
    }
    default:
      return state;
  }
}
