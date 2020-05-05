import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';

import skateBoardText from './skateBoardText';
import allBotsDictionary from './allBotsDictionary';
import allBotsNames from './allBotsNames';
import searchingFor from './searchingFor';
import searchResult from './searchResult';
import selectedResult from './selectedResult';
import selectedBot from './selectedBot';
import isLoading from './isLoading';
import skatePanel from './skatePanel';
import botResponseType from './botResponseType';
import commandStatus from './commandStatus';
import isInitialising from './isInitialising';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    skateBoardText,
    allBotsDictionary,
    allBotsNames,
    searchingFor,
    searchResult,
    selectedResult,
    selectedBot,
    isLoading,
    isInitialising,
    skatePanel,
    botResponseType,
    commandStatus
  });
}
