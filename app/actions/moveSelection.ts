import { UPDATE_SELECTED_RESULT } from './actions';

import { GetState, Dispatch } from '../reducers/types';

export enum moveSelectionOptions {
  FIRST = 'FIRST',
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
  REMOVE = 'REMOVE'
}

const moveSelection = (direction: moveSelectionOptions) => {
  return (dispatch: Dispatch, getState: GetState) => {
    const { searchResult, selectedResult } = getState();
    let newSelectedResult;
    if (direction === moveSelectionOptions.FIRST) {
      if (searchResult.length > 0) {
        newSelectedResult = searchResult[0];
      } else if (searchResult.length === 0) {
        newSelectedResult = '';
      }
    }
    if (direction === moveSelectionOptions.NEXT) {
      const index = searchResult.indexOf(selectedResult);
      const nextIndex = index === -1 ? 0 : index + 1;
      if (nextIndex <= searchResult.length - 1) {
        newSelectedResult = searchResult[nextIndex];
      } else {
        newSelectedResult = searchResult[0];
      }
    }
    if (direction === moveSelectionOptions.PREVIOUS) {
      const index = searchResult.indexOf(selectedResult);
      const nextIndex = index === -1 ? searchResult.length - 1 : index - 1;
      if (nextIndex >= 0) {
        newSelectedResult = searchResult[nextIndex];
      } else {
        newSelectedResult = searchResult[searchResult.length - 1];
      }
    }

    if (direction === moveSelectionOptions.REMOVE) {
      newSelectedResult = '';
    }

    dispatch({ type: UPDATE_SELECTED_RESULT, payload: { newSelectedResult } });
  };
};
export default moveSelection;
