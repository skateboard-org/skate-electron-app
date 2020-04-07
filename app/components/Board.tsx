import React, { ChangeEvent } from 'react';
import styles from './Skate.scss';

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

type Props = {
  initState: () => void;
  executeCommand: (botName: string, botParam: string) => void;
  moveSelection: (direction: string) => void;
  chooseResult: (selection?: 0 | string) => void;
  invalidCommand: (problem: 'unknownCommand' | 'requestParam') => void;
  reset: () => void;
  search: (
    type: 'bots' | 'params',
    searchTerm: string,
    searchSpace?: string[]
  ) => void;
  updateSkateBoardText: (newText: string) => void;

  searchResult: [string];
  selectedResult: string;
  searchingFor: string;
  allBotsDictionary: Map<string, BotType>;
  allBotsNames: string[];
  selectedParam: string;
  skateBoardText: string;
};

export default function Skate(props: Props) {
  const {
    initState,
    searchResult,
    selectedResult,
    executeCommand,
    moveSelection,
    chooseResult,
    invalidCommand,
    searchingFor,
    allBotsDictionary,
    allBotsNames,
    selectedParam,
    skateBoardText,
    updateSkateBoardText,
    search,
    reset
  } = props;

  initState();

  function onTextUpdate(newText: string) {
    updateSkateBoardText(newText);

    if (newText.length === 0) {
      reset();
    }

    const { result, botString, paramString } = strfn.stringAnalysis(newText);

    switch (result) {
      case strfn.ONLY_BOT_PRESENT:
        if (allBotsNames.indexOf(botString) === -1 && botString !== undefined) {
          // WHEN BOT STRING IS ENTERED AND DOESN'T MATCH WITH ANY BOT
          // if (searchResult.length === 1) {
          //   // WHEN BOT STRING AND THERE'S ONLY SEARCH RESULT
          // } else {

          search('bots', botString);
          // }
        } else if (searchingFor === 'bot' && botString !== undefined) {
          // WHEN BOT STRING IS ENTERED AND MATCHES PERFECTLY WITH A BOT, CHOOSE THAT BOT
          chooseResult(botString);
        }
        break;

      case strfn.BOT_AND_PARAM_PRESENT: {
        const bot = allBotsDictionary.get(botString);
        if (bot.name !== undefined && paramString !== undefined) {
          // if (['one', 'two', 'three'].indexOf(paramString) === -1) {
          search('params', paramString, bot.typeAheadOptions);
        }
        // }
        break;
      }
      case strfn.INVALID_STRING_IN_SKATEBOARD:
        invalidCommand('unknownCommand');
        break;

      default:
        break;
    }
  }

  function onKeyDown(event: ChangeEvent<HTMLInputElement>) {
    const keyPressed = keyMapper(event);

    if (keyPressed === KEY_UP) {
      event.preventDefault();
      moveSelection('previous');
    } else if (keyPressed === KEY_DOWN) {
      event.preventDefault();
      moveSelection('next');
    } else if (keyPressed === KEY_RIGHT || keyPressed === KEY_TAB) {
      if (isCursorAtTheEnd(event)) {
        event.preventDefault();
        if (selectedResult === '' || selectedResult === undefined) {
          chooseResult(0);
        }
        if (selectedResult !== '' && typeof selectedResult === 'string') {
          chooseResult();
        }
      }
    } else if (keyPressed === KEY_ENTER) {
      const { result, botString, paramString } = strfn.stringAnalysis(
        event.target.value
      );
      switch (result) {
        case strfn.ONLY_BOT_PRESENT: {
          if (searchResult.indexOf(botString) > -1) {
            // IF THE BOTSTRING IS A BOT AVAILABLE IN THE SEARCH RESULTS
            // CHECK IF IT REQUIRES PARAMETER IF NOT EXECUTE
            const bot = allBotsDictionary.get(botString);
            if (bot?.parameterEnabled) {
              invalidCommand('requestParam');
            } else {
              executeCommand(botString, paramString);
            }
          } else if (selectedResult !== '') {
            // IF THE BOTSTRING IS NOT A BOT AVAILABLE IN THE SEARCH RESULTS
            // AND USER HAS SELECTED A RESULT FROM SEARCH PANEL, CHOOSE IT
            chooseResult();
          } else if (searchResult.length > 0) {
            // IF THE BOTSTRING IS NOT A BOT AVAILABLE IN THE SEARCH RESULTS
            // AND USER HAS NOT SELECTED A RESULT FROM SEARCH PANEL
            // AND THERE ARE NON ZERO SEARCH RESULTS
            // CHOOSE THE FIRST ONE
            chooseResult(0);
          } else {
            // IF THE BOTSTRING IS NOT A BOT AVAILABLE IN THE SEARCH RESULTS
            // AND USER HAS NOT SELECTED A RESULT FROM SEARCH PANEL
            // AND THERE ARE ZERO SEARCH RESULTS
            // TELL USER THAT COMMAND IS UNKNOWN
            invalidCommand('unknownCommand');
          }
          break;
        }
        case strfn.BOT_AND_PARAM_PRESENT:
          if (selectedParam !== paramString) {
            // IF PARAMSTRING IS DIFFERENT FROM THE SELECTED PARAM CHOOSE RESULT
            chooseResult(paramString);
          }

          // IF BOT AND PARAM ARE BOTH PRESENT AND ENTER KEY IS PROCESSED TIME
          executeCommand(botString, paramString);

          break;
        case strfn.INVALID_STRING_IN_SKATEBOARD:
          invalidCommand('unknownCommand');
          break;
        default:
          break;
      }
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div>
      <div className="container is-clipped">
        <div className={`${styles.skate}`} data-tid="skate">
          <input
            onKeyDown={e => onKeyDown(e)}
            id="skateBoard"
            type="text"
            value={skateBoardText}
            className={`input ${styles.skateBoard}`}
            data-tid="skateBoard"
            onChange={e => onTextUpdate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
