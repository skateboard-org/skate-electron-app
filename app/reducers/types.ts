import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { BotType } from './allBotsDictionary';
import { CommandStatusType } from './commandStatus';
import { isInitialisingType } from './isInitialising';

export type StateType = {
  counter: number;
  skateBoardText: string;
  allBotsDictionary: Map<string, BotType>;
  allBotsNames: [string];
  searchingFor: string;
  searchResult: [string];
  selectedBot: string;
  selectedResult: string;
  isLoading: boolean;
  skatePanel: [any];
  botResponseType: string;
  commandStatus: CommandStatusType;
  isInitialising: isInitialisingType;
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<StateType, Action<string>>;
