import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';

import skateBoardText from './skateBoardText';
import allBotsDictionary from './allBotsDictionary';
import allBotsNames from './allBotsNames';
import selectedBot from './selectedBot';
import searchingFor from './searchingFor';
import searchResult from './searchResult';
import selectedParam from './selectedParam';
import selectedResult from './selectedResult';
import isLoading from './isLoading';
import skatePanel from './skatePanel';
import botResponseType from './botResponseType';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    skateBoardText,
    allBotsDictionary,
    allBotsNames,
    selectedBot,
    searchingFor,
    searchResult,
    selectedParam,
    selectedResult,
    isLoading,
    skatePanel,
    botResponseType
  });
}
