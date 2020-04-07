import { UNKNOWN_COMMAND, REQUEST_PARAMETER } from './actions';

import { Dispatch } from '../reducers/types';

export default function invalidCommand(
  problem: 'requestParameter' | 'unknownCommond'
) {
  return (dispatch: Dispatch) => {
    if (problem === 'requestParameter') {
      dispatch({ type: REQUEST_PARAMETER });
    }
    if (problem === 'unknownCommond') {
      dispatch({ type: UNKNOWN_COMMAND });
    }
  };
}
