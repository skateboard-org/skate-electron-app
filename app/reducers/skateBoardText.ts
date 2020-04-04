import { Action } from 'redux';
import { UPDATE_SKATEBOARD_TEXT, CHOOSE_RESULT } from '../actions/actions';

export default function skateBoardText(state = '', action: Action<string>) {
  switch (action.type) {
    case UPDATE_SKATEBOARD_TEXT:
      if (action.payload.newText.endsWith(' '))
        return `${action.payload.newText.trim()} `;
      return action.payload.newText;
    case CHOOSE_RESULT:
      if (action.payload.searchingFor === 'bot') {
        return `${action.payload.selectedResult} `;
      }
      if (action.payload.searchingFor === 'parameter') {
        return `${action.payload.selectedBotIfAny} ${action.payload.selectedResult}`;
      }
      return state;

    default:
      return state;
  }
}
