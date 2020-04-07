import { SEARCH_BOTS, SEARCH_PARAMETERS } from './actions';

import { GetState, Dispatch } from '../reducers/types';

export default function search(
  type: 'bots' | 'params',
  searchTerm: string,
  searchSpace?: string[]
) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { allBotsNames } = getState();
    switch (type) {
      case 'bots':
        dispatch({
          type: SEARCH_BOTS,
          payload: { allBotsNames, searchTerm }
        });
        break;
      case 'params':
        dispatch({
          type: SEARCH_PARAMETERS,
          payload: { allParamNames: searchSpace || [], searchTerm }
        });
        break;
      default:
        break;
    }
  };
}
