import { MARK_SEARCH_FOR_BOTS, MARK_SEARCH_FOR_PARAMS } from './actions';

const markSearch = (searchingFor: string) => {
  if (searchingFor === 'bot') {
    return { type: MARK_SEARCH_FOR_BOTS };
  }
  if (searchingFor === 'parameter') {
    return { type: MARK_SEARCH_FOR_PARAMS };
  }
  return null;
};

export default markSearch;
