import { LOAD_BOTS, LOADING_BOTS } from './actions';
import { getAllBots } from '../bots/index';

import { GetState, Dispatch } from '../reducers/types';

const loadBots = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: LOADING_BOTS
    });
    getAllBots()
      .then((bots: any[]) => {
        return dispatch({
          type: LOAD_BOTS,
          payload: { newAllBots: bots }
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
};

export default loadBots;
