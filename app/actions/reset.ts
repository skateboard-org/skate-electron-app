import { RESET } from './actions';

import { Dispatch } from '../reducers/types';

const reset = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: RESET });
  };
};

export default reset;
