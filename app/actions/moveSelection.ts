import {
  NEXT_RESULT,
  PREVIOUS_RESULT,
  FIRST_RESULT,
  REMOVE_SELECTION
} from './actions';

import { GetState, Dispatch } from '../reducers/types';

const moveSelection = (direction: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    const { searchResult } = getState();
    if (direction === 'first') {
      dispatch({ type: FIRST_RESULT, payload: { searchResult } });
    }
    if (direction === 'next') {
      dispatch({ type: NEXT_RESULT, payload: { searchResult } });
    }
    if (direction === 'previous') {
      dispatch({ type: PREVIOUS_RESULT, payload: { searchResult } });
    }
    if (direction === 'remove') {
      dispatch({ type: REMOVE_SELECTION });
    }
  };
};
export default moveSelection;
