import React, { ChangeEvent, Component } from 'react';

import {
  keyMapper,
  KEY_DOWN,
  KEY_UP,
  KEY_RIGHT,
  KEY_ENTER,
  KEY_TAB
} from '../utils/keys';

import * as strfn from '../utils/string-functions';
import {
  isCursorAtTheEnd,
  setCaretPosition,
  getCaretPosition
} from '../utils/caret';
import { BotType } from '../reducers/allBotsDictionary';
import { contractWindow, expandWindow } from '../utils/window';

type BoardState = {
  placeholder: string;
};

type Props = {
  initState: () => void;
  executeCommand: (
    botName: string,
    botParam: string,
    responseType: string,
    type: string
  ) => void;
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

export default class Board extends Component<Props, BoardState> {
  skateBoardInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      placeholder: 'Type @ to begin'
    };
    this.skateBoardInputRef = React.createRef<HTMLInputElement>();
  }

  componentDidMount() {
    const { initState } = this.props;
    initState();
    this.focusInputField();
    // Attach callback to event listener
  }

  focusInputField = () => {
    console.log('focused');
  };

  selectAllText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { end, id } = getCaretPosition(event);
    setCaretPosition(id, 0, end);
  };

  onTextUpdate = (newText: string) => {
    const {
      invalidCommand,
      searchingFor,
      allBotsDictionary,
      allBotsNames,
      chooseResult,
      updateSkateBoardText,
      search,
      moveSelection,
      searchResult,
      reset
    } = this.props;

    if (newText === ' ' || newText === '@ ') {
      return;
    }

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
          moveSelection('first');
          // }
        } else if (searchingFor === 'bot' && botString !== undefined) {
          // WHEN BOT STRING IS ENTERED AND MATCHES PERFECTLY WITH A BOT, CHOOSE THAT BOT
          chooseResult(botString);
        }
        break;

      case strfn.BOT_AND_PARAM_PRESENT: {
        const bot = allBotsDictionary.get(botString);
        if (bot?.name !== undefined && paramString !== undefined) {
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
  };

  onKeyDown = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      searchResult,
      selectedResult,
      executeCommand,
      moveSelection,
      chooseResult,
      invalidCommand,
      allBotsDictionary,
      allBotsNames,
      selectedParam
    } = this.props;

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
        if (
          (selectedResult === '' || selectedResult === undefined) &&
          searchResult.length > 0
        ) {
          chooseResult(0);
        }
        if (
          selectedResult !== '' &&
          typeof selectedResult === 'string' &&
          searchResult.length > 0
        ) {
          chooseResult();
        }
      }
    } else if (keyPressed === KEY_ENTER) {
      const stringAnalysis = strfn.stringAnalysis(event.target.value);
      console.log(stringAnalysis);
      const { result, botString, paramString } = stringAnalysis;
      switch (result) {
        case strfn.ONLY_BOT_PRESENT: {
          if (allBotsNames.indexOf(botString) > -1) {
            // IF THE BOTSTRING IS A BOT AVAILABLE IN THE LISTS OF BOTS
            // CHECK IF IT REQUIRES PARAMETER IF NOT EXECUTE
            const bot = allBotsDictionary.get(botString);
            if (bot?.parameterEnabled) {
              invalidCommand('requestParam');
            } else {
              executeCommand(
                botString,
                paramString,
                bot?.responseType,
                bot?.type
              );
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
        case strfn.BOT_AND_PARAM_PRESENT: {
          if (selectedParam !== paramString) {
            // IF PARAMSTRING IS DIFFERENT FROM THE SELECTED PARAM CHOOSE RESULT
            chooseResult(paramString);
          }

          // IF BOT AND PARAM ARE BOTH PRESENT AND ENTER KEY IS PROCESSED TIME
          const bot = allBotsDictionary.get(botString);

          executeCommand(botString, paramString, bot?.responseType, bot?.type);

          break;
        }
        case strfn.INVALID_STRING_IN_SKATEBOARD:
          invalidCommand('unknownCommand');
          break;
        default:
          break;
      }
    }
  };

  render() {
    const { skateBoardText } = this.props;
    const { placeholder } = this.state;
    if (skateBoardText.length > 0) {
      expandWindow();
    } else contractWindow();
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="column is-12 board-padding">
        <div className="skateBoardContainer" data-tid="skate">
          <input
            onKeyDown={e => this.onKeyDown(e)}
            id="skateBoard"
            type="text"
            value={skateBoardText}
            className="input skateBoard"
            data-tid="skateBoard"
            onChange={e => this.onTextUpdate(e.target.value)}
            placeholder={placeholder}
            onBlur={e => this.selectAllText(e)}
          />
        </div>
      </div>
    );
  }
}
