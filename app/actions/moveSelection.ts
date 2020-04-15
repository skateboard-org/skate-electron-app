import { NEXT_RESULT, PREVIOUS_RESULT, FIRST_RESULT } from './actions';

import { GetState, Dispatch } from '../reducers/types';

export default function moveSelection(direction: string) {
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
  };
}
