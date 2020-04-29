import { MARK_SEARCH_FOR_BOTS, MARK_SEARCH_FOR_PARAMS } from './actions';

import { Dispatch } from '../reducers/types';

export default function markSearch(searchingFor: string) {
  console.log('markSearch', searchingFor);
  return (dispatch: Dispatch) => {
    if (searchingFor === 'bot') {
      dispatch({ type: MARK_SEARCH_FOR_BOTS });
    }
    if (searchingFor === 'parameter') {
      dispatch({ type: MARK_SEARCH_FOR_PARAMS });
    }
  };
}
