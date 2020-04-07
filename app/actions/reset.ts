import { RESET } from './actions';

import { Dispatch } from '../reducers/types';

export default function reset() {
  return (dispatch: Dispatch) => {
    dispatch({ type: RESET });
  };
}
