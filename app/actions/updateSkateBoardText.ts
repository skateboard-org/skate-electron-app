import { UPDATE_SKATEBOARD_TEXT } from './actions';

import { Dispatch } from '../reducers/types';

export default function updateSkateBoardText(newText: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_SKATEBOARD_TEXT,
      payload: {
        newText
      }
    });
  };
}
