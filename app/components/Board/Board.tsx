/* eslint-disable no-lonely-if */
import React, { ChangeEvent, Component } from 'react';
import { setUpWindow, contractWindow, expandWindow } from '../../utils/window';

import {
  keyMapper,
  KEY_DOWN,
  KEY_UP,
  KEY_RIGHT,
  KEY_ENTER,
  KEY_TAB
} from '../../utils/keys';

import * as strfn from '../../utils/string-functions';
import {
  isCursorAtTheEnd,
  setCaretPosition,
  getCaretPosition
} from '../../utils/caret';
import { BotType } from '../../reducers/allBotsDictionary';
import {
  botStatusMessages,
  paramStatusMessages
} from '../../reducers/commandStatus';

import StatusLight from '../StatusLight/StatusLightContainer';
import { moveSelectionOptions } from '../../actions/moveSelection';
import { quitWindow } from '../../utils/ipc';
import { isInitialisingType } from '../../reducers/isInitialising';

type BoardState = {
  placeholder: string;
  invalidStrings: string[];
};

type Props = {
  executeCommand: (
    botName: string,
    botParam: string,
    responseType: string,
    type: string
  ) => void;
  moveSelection: (direction: moveSelectionOptions) => void;
  storeBotName: (bot: string) => void;
  reset: () => void;
  search: (
    type: 'bots' | 'params',
    searchTerm: string,
    searchSpace?: string[]
  ) => void;
  updateSkateBoardText: (newText: string) => void;
  markSearch: (searchingFor: 'bot' | 'parameter') => void;
  updateCommandStatus: (
    type: 'bot' | 'param',
    status: botStatusMessages | paramStatusMessages
  ) => void;

  searchResult: [string];
  selectedResult: string;
  searchingFor: string;
  allBotsDictionary: Map<string, BotType>;
  allBotsNames: string[];
  selectedBot: string;
  skateBoardText: string;
  isInitialising: isInitialisingType;
};

export default class Board extends Component<Props, BoardState> {
  skateBoardInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      placeholder: 'Type @ to begin',
      invalidStrings: [' ', '@ ']
    };
    this.skateBoardInputRef = React.createRef<HTMLInputElement>();
  }

  componentDidMount() {
    this.focusInputField();
    setUpWindow();
    // Attach callback to event listener
  }

  focusInputField = () => {
    if (this.skateBoardInputRef.current !== null) {
      this.skateBoardInputRef.current.focus();
    }
  };

  selectAllText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { end, id } = getCaretPosition(event);
    setCaretPosition(id, 0, end);
  };

  doesContainInvalidStrings = (newText: string): boolean => {
    const { invalidStrings } = this.state;
    let doesContainInvalidStrings = false;

    invalidStrings.forEach((word: string) => {
      if (word === newText) {
        doesContainInvalidStrings = true;
      }
    });
    return doesContainInvalidStrings;
  };

  onlyAllowOneSpace = (newText: string): string => {
    let finalText = newText;
    if (newText.endsWith(' ')) {
      finalText = `${newText.trim()} `;
    }
    return finalText;
  };

  doesUserWantsToReset = (newText: string): boolean => {
    if (newText.length === 0) {
      return true;
    }
    if (newText === 'clear') {
      return true;
    }
    return false;
  };

  doesUserWantsToQuit = (newText: string): boolean => {
    if (newText === 'quit') {
      return true;
    }
    return false;
  };

  isThisAValidBot = (botString: string): boolean => {
    const { allBotsNames } = this.props;
    if (botString && allBotsNames.indexOf(botString) >= 0) {
      return true;
    }
    return false;
  };

  isThisAValidParam = (paramString: string, paramArray: string[]): boolean => {
    if (paramArray && paramString) {
      if (paramArray.indexOf(paramString) < 0) {
        return false;
      }
      return true;
    }
    return false;
  };

  isThisParamProper = (paramString: string): boolean => {
    if (paramString && paramString.length > 0) {
      return true;
    }
    return false;
  };

  doesThisBotRequireParam = (botName: string): boolean => {
    const { allBotsDictionary } = this.props;
    const bot = allBotsDictionary.get(botName);
    if (bot && bot.name) {
      return bot.parameterEnabled;
    }
    return false;
  };

  getTypeAheadOptions = (botName: string): string[] => {
    const { allBotsDictionary } = this.props;
    const bot = allBotsDictionary.get(botName);
    if (bot && bot.parameterEnabled) {
      return bot.typeAheadOptions;
    }
    return [];
  };

  doesThisBotHasTypeAhead = (botName: string): boolean => {
    const { allBotsDictionary } = this.props;
    const bot = allBotsDictionary.get(botName);
    if (bot && bot.name) {
      if (bot.typeAheadEnabled) {
        return bot.typeAheadEnabled;
      }
    }
    return false;
  };

  areThereAnySearchResults = () => {
    const { searchResult } = this.props;
    if (searchResult.length > 0) {
      return true;
    }
    return false;
  };

  isthereAnythingSelected = () => {
    const { selectedResult } = this.props;
    if (selectedResult && selectedResult.length > 0) {
      return true;
    }
    return false;
  };

  tellUserTheyCanExecute = () => {
    console.log('PRESS ENTER TO EXECUTE');
  };

  execute = (botString: string, paramString: string) => {
    if (botString) {
      const { allBotsDictionary, executeCommand } = this.props;
      const bot = allBotsDictionary.get(botString);
      if (bot) {
        executeCommand(botString, paramString, bot.responseType, bot.type);
      }
    }
  };

  processText = (text: string, shouldExecute: boolean) => {
    const {
      storeBotName,
      search,
      moveSelection,
      markSearch,
      updateCommandStatus,
      allBotsNames
    } = this.props;

    const { result, botString, paramString } = strfn.stringAnalysis(text);

    if (result === strfn.ONE_TOKEN_PRESENT) {
      // IF THERE ONLY ONE TOKEN IN THE STRING

      // MARK SEARCH AS SEARCHING FOR BOT
      markSearch('bot');

      if (this.isThisAValidBot(botString)) {
        // IF BOTSTRING IS A VALID BOT

        updateCommandStatus('bot', botStatusMessages.Valid);
        storeBotName(botString);
        moveSelection(moveSelectionOptions.REMOVE);

        if (this.doesThisBotRequireParam(botString)) {
          if (shouldExecute) {
            updateCommandStatus(
              'param',
              paramStatusMessages.ParamRequiredAndNotGiven
            );
          } else {
            updateCommandStatus('param', paramStatusMessages.Empty);
          }
        } else {
          updateCommandStatus(
            'param',
            paramStatusMessages.ParamNotRequiredAndNotGiven
          );
          if (shouldExecute) {
            this.execute(botString, paramString);
          }
        }
      } else {
        // IF BOTSTRING IS NOT A VALID BOT
        search('bots', botString, allBotsNames);
        moveSelection(moveSelectionOptions.FIRST);
      }
    } else if (result === strfn.MORE_THAN_ONE_TOKEN_PRESENT) {
      markSearch('parameter');
      if (this.isThisAValidBot(botString)) {
        updateCommandStatus('bot', botStatusMessages.Valid);
        if (this.doesThisBotRequireParam(botString)) {
          if (this.doesThisBotHasTypeAhead(botString)) {
            const options = this.getTypeAheadOptions(botString);
            if (this.isThisAValidParam(paramString, options)) {
              updateCommandStatus('param', paramStatusMessages.Valid);
              if (shouldExecute) {
                this.execute(botString, paramString);
              }
            } else {
              search('params', paramString, options);
              moveSelection(moveSelectionOptions.FIRST);
              if (!this.areThereAnySearchResults()) {
                updateCommandStatus(
                  'param',
                  paramStatusMessages.ParamNotFoundInOptions
                );
              }
            }
          } else {
            if (this.isThisParamProper(paramString)) {
              updateCommandStatus('param', paramStatusMessages.Valid);
              this.tellUserTheyCanExecute();
              if (shouldExecute) {
                this.execute(botString, paramString);
              }
            } else {
              if (shouldExecute) {
                updateCommandStatus(
                  'param',
                  paramStatusMessages.ParamRequiredAndNotGiven
                );
              } else {
                updateCommandStatus('param', paramStatusMessages.Empty);
              }
            }
          }
        } else {
          if (this.isthereAnythingSelected()) {
            moveSelection(moveSelectionOptions.REMOVE);
          }
          updateCommandStatus(
            'param',
            paramStatusMessages.ParamNotRequiredAndGiven
          );
        }
      }
    }
  };

  chooseOption = () => {
    const {
      searchingFor,
      selectedBot,
      selectedResult,
      updateSkateBoardText
    } = this.props;

    let updatedText;
    if (searchingFor === 'bot') {
      updatedText = selectedResult;
    }
    if (searchingFor === 'parameter') {
      updatedText = `${selectedBot} ${selectedResult}`;
    }
    if (updatedText) {
      updateSkateBoardText(updatedText);
      this.processText(updatedText, true);
    } else {
      console.log('Error');
    }
  };

  onTextUpdate = (newText: string) => {
    const { updateSkateBoardText, reset } = this.props;

    if (this.doesContainInvalidStrings(newText)) {
      return;
    }

    const finalText = this.onlyAllowOneSpace(newText);
    updateSkateBoardText(finalText);

    if (this.doesUserWantsToReset(newText)) {
      reset();
    }

    if (this.doesUserWantsToQuit(newText)) {
      quitWindow();
    }

    this.processText(newText, false);
  };

  onKeyDown = (event: ChangeEvent<HTMLInputElement>) => {
    const { moveSelection } = this.props;

    const keyPressed = keyMapper(event);

    if (keyPressed === KEY_UP) {
      event.preventDefault();
      moveSelection(moveSelectionOptions.PREVIOUS);
    } else if (keyPressed === KEY_DOWN) {
      event.preventDefault();
      moveSelection(moveSelectionOptions.NEXT);
    } else if (keyPressed === KEY_RIGHT || keyPressed === KEY_TAB) {
      if (isCursorAtTheEnd(event)) {
        event.preventDefault();
        this.chooseOption();
      }
    } else if (keyPressed === KEY_ENTER) {
      const text = event.target.value;
      if (this.areThereAnySearchResults()) {
        // IF THERE IS ANY SEARCH RESULTS SHOWN
        event.preventDefault();
        this.chooseOption();
      } else {
        this.processText(text, true);
      }
    }
  };

  render() {
    const { skateBoardText, isInitialising } = this.props;
    const { placeholder } = this.state;

    if (skateBoardText.length > 0) {
      expandWindow();
    } else contractWindow();

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="column">
        <div className="skate-board-container" data-tid="skate">
          <div className="control has-icons-right">
            <input
              onKeyDown={e => this.onKeyDown(e)}
              id="skateBoard"
              type="text"
              value={skateBoardText}
              className="input skateBoard"
              data-tid="skateBoard"
              onChange={e => this.onTextUpdate(e.target.value)}
              placeholder={
                isInitialising.status ? 'Initialising...' : placeholder
              }
              onBlur={e => this.selectAllText(e)}
              ref={this.skateBoardInputRef}
            />
            <span className="icon is-right loaderContainer">
              <StatusLight />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
