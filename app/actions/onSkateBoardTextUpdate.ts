import * as strfn from '../utils/string-functions';
import { GetState, Dispatch } from '../reducers/types';
import {
  SEARCH_BOTS,
  SEARCH_PARAMETERS,
  INVALID_STRING,
  UPDATE_SKATEBOARD_TEXT,
  RESET,
  CHOOSE_RESULT
} from './actions';

export default function onSkateBoardTextUpdate(newText: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: UPDATE_SKATEBOARD_TEXT, payload: { newText } });

    if (newText.length === 0) {
      dispatch({
        type: RESET
      });
      return;
    }

    const { allBotsNames, searchingFor, allBotsDictionary } = getState();
    const { result, botString, paramString } = strfn.stringAnalysis(newText);

    switch (result) {
      case strfn.ONLY_BOT_PRESENT:
        if (allBotsNames.indexOf(botString) === -1) {
          // WHEN BOT STRING IS ENTERED AND DOESN'T MATCH WITH ANY BOT
          // if (searchResult.length === 1) {
          //   // WHEN BOT STRING AND THERE'S ONLY SEARCH RESULT
          // } else {
          dispatch({
            type: SEARCH_BOTS,
            payload: { allBotsNames, searchTerm: botString }
          });
          // }
        } else if (searchingFor === 'bot') {
          // WHEN BOT STRING IS ENTERED AND MATCHES PERFECTLY WITH A BOT, CHOOSE THAT BOT
          dispatch({
            type: CHOOSE_RESULT,
            payload: {
              selectedResult: botString,
              searchingFor
            }
          });
        }
        break;

      case strfn.BOT_AND_PARAM_PRESENT:
        const bot = allBotsDictionary.get(botString);
        if (bot.name !== undefined) {
          // if (['one', 'two', 'three'].indexOf(paramString) === -1) {
          dispatch({
            type: SEARCH_PARAMETERS,
            payload: {
              allParamNames: bot.typeAheadOptions || [],
              searchTerm: paramString
            }
          });
        }
        // }
        break;

      case strfn.INVALID_STRING_IN_SKATEBOARD:
        dispatch({
          type: INVALID_STRING
        });
        break;

      default:
        break;
    }
  };
}
