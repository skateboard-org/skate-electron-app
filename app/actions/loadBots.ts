import {
  LOAD_BOTS,
  LOADING_BOTS,
  LOADING_TIME_ELAPSED,
  LOADING_FAILED
} from './actions';
import { getAllBots } from '../bots/index';

import { GetState, Dispatch } from '../reducers/types';

const initialisingDuration = 10 * 1000;
let initialisationTimer: NodeJS.Timeout;

const loadBots = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: LOADING_BOTS
    });

    initialisationTimer = setTimeout(() => {
      dispatch({
        type: LOADING_TIME_ELAPSED
      });
      clearTimeout(initialisationTimer);
    }, initialisingDuration);

    getAllBots()
      .then((bots: any[]) => {
        clearTimeout(initialisationTimer);
        return dispatch({
          type: LOAD_BOTS,
          payload: { newAllBots: bots }
        });
      })
      .catch((error: any) => {
        clearTimeout(initialisationTimer);
        dispatch({
          type: LOADING_FAILED
        });
        console.log(error);
      });
  };
};

export default loadBots;
