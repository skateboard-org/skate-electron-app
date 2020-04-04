import {
  keyMapper,
  KEY_DOWN,
  KEY_UP,
  KEY_RIGHT,
  KEY_ENTER,
  KEY_TAB
} from '../utils/keys';

import { isCursorAtTheEnd } from '../utils/caret';

import * as strfn from '../utils/string-functions';
import { GetState, Dispatch } from '../reducers/types';
import {
  NEXT_RESULT,
  PREVIOUS_RESULT,
  CHOOSE_RESULT,
  UNKNOWN_COMMAND,
  REQUEST_PARAMETER,
  EXECUTE
} from './actions';

export default function onKeyDown(event: unknown) {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      selectedResult,
      searchResult,
      searchingFor,
      selectedBot,
      skateBoardText,
      allBotsDictionary,
      selectedParam
    } = getState();

    const keyPressed = keyMapper(event);

    if (keyPressed === KEY_UP) {
      event.preventDefault();
      dispatch({
        type: PREVIOUS_RESULT,
        payload: { searchResult }
      });
    } else if (keyPressed === KEY_DOWN) {
      event.preventDefault();
      dispatch({
        type: NEXT_RESULT,
        payload: { searchResult }
      });
    } else if (keyPressed === KEY_RIGHT || keyPressed === KEY_TAB) {
      if (isCursorAtTheEnd(event)) {
        event.preventDefault();
        console.log('selectedResult: ', selectedResult);
        if (selectedResult === '' || selectedResult === undefined) {
          dispatch({
            type: CHOOSE_RESULT,
            payload: {
              selectedResult: searchResult[0],
              searchingFor,
              selectedBotIfAny: selectedBot
            }
          });
        }

        if (selectedResult !== '' && typeof selectedResult === 'string') {
          dispatch({
            type: CHOOSE_RESULT,
            payload: {
              selectedResult,
              searchingFor,
              selectedBotIfAny: selectedBot
            }
          });
        }
      }
    } else if (keyPressed === KEY_ENTER) {
      const { result, botString, paramString } = strfn.stringAnalysis(
        skateBoardText
      );
      switch (result) {
        case strfn.ONLY_BOT_PRESENT: {
          if (searchResult.indexOf(botString) > -1) {
            // IF THE BOTSTRING IS A BOT AVAILABLE IN THE SEARCH RESULTS
            // CHECK IF IT REQUIRES PARAMETER IF NOT EXECUTE
            const bot = allBotsDictionary.get(botString);
            if (bot?.parameterEnabled) {
              dispatch({
                type: REQUEST_PARAMETER
              });
            } else {
              dispatch({
                type: EXECUTE,
                payload: {
                  searchingFor,
                  botName: botString,
                  paramName: paramString
                }
              });
            }
          } else if (selectedResult !== '') {
            // IF THE BOTSTRING IS NOT A BOT AVAILABLE IN THE SEARCH RESULTS
            // AND USER HAS SELECTED A RESULT FROM SEARCH PANEL, CHOOSE IT

            dispatch({
              type: CHOOSE_RESULT,
              payload: {
                selectedResult,
                searchingFor
              }
            });
          } else if (searchResult.length > 0) {
            // IF THE BOTSTRING IS NOT A BOT AVAILABLE IN THE SEARCH RESULTS
            // AND USER HAS NOT SELECTED A RESULT FROM SEARCH PANEL
            // AND THERE ARE NON ZERO SEARCH RESULTS
            // CHOOSE THE FIRST ONE

            dispatch({
              type: CHOOSE_RESULT,
              payload: {
                selectedResult: searchResult[0],
                searchingFor
              }
            });
          } else {
            // IF THE BOTSTRING IS NOT A BOT AVAILABLE IN THE SEARCH RESULTS
            // AND USER HAS NOT SELECTED A RESULT FROM SEARCH PANEL
            // AND THERE ARE ZERO SEARCH RESULTS
            // TELL USER THAT COMMAND IS UNKNOWN

            dispatch({
              type: UNKNOWN_COMMAND,
              payload: {
                botName: botString,
                paramName: paramString
              }
            });
          }
          break;
        }
        case strfn.BOT_AND_PARAM_PRESENT:
          if (selectedParam != paramString) {
            // IF PARAMSTRING IS DIFFERENT FROM THE SELECTED PARAM CHOOSE RESULT
            dispatch({
              type: CHOOSE_RESULT,
              payload: {
                selectedResult: paramString,
                searchingFor,
                selectedBotIfAny: selectedBot
              }
            });
          }

          // IF BOT AND PARAM ARE BOTH PRESENT AND ENTER KEY IS PROCESSED TIME
          dispatch({
            type: EXECUTE,
            payload: {
              searchingFor,
              selectedBot,
              selectedParam: paramString
            }
          });
          break;
        case strfn.INVALID_STRING_IN_SKATEBOARD:
          dispatch({
            type: UNKNOWN_COMMAND,
            payload: {
              botName: botString,
              paramName: paramString
            }
          });
          break;
        default:
          break;
      }
    }
  };
}
