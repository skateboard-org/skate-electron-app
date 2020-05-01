import { UPDATE_SKATEBOARD_TEXT } from './actions';

import { Dispatch } from '../reducers/types';

const updateSkateBoardText = (newText: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_SKATEBOARD_TEXT,
      payload: {
        newText
      }
    });
  };
};

export default updateSkateBoardText;
