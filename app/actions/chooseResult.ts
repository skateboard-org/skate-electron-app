import { CHOOSE_RESULT } from './actions';

import { GetState, Dispatch } from '../reducers/types';

export default function chooseResult(selection?: 0 | string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      searchingFor,
      selectedBot,
      searchResult,
      selectedResult
    } = getState();

    let mySelectedResult;

    if (selection === undefined) {
      mySelectedResult = selectedResult;
    }
    if (selection === 0) {
      mySelectedResult = searchResult[0];
    }
    if (typeof selection === 'string') {
      mySelectedResult = selection;
    }
    dispatch({
      type: CHOOSE_RESULT,
      payload: {
        searchingFor,
        selectedBotIfAny: selectedBot,
        selectedResult: mySelectedResult
      }
    });
  };
}
