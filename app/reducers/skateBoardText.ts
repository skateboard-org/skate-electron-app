import { Action } from 'redux';
import {
  RESET,
  UPDATE_SKATEBOARD_TEXT,
  CHOOSE_RESULT
} from '../actions/actions';

export default function skateBoardText(state = '', action: Action<string>) {
  switch (action.type) {
    case UPDATE_SKATEBOARD_TEXT:
      return action.payload.newText;
    case CHOOSE_RESULT:
      if (action.payload.searchingFor === 'bot') {
        return `${action.payload.selectedBot}`;
      }
      if (action.payload.searchingFor === 'parameter') {
        return `${action.payload.selectedBot} ${action.payload.selectedParam}`;
      }
      return state;
    case RESET: {
      return '';
    }
    default:
      return state;
  }
}
