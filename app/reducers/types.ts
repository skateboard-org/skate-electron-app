import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type StateType = {
  counter: number;
  skateBoardText: string;
  allBotsDictionary: Map<string, BotType>;
  allBotsNames: [string];
  searchingFor: string;
  searchResult: [string];
  selectedBot: string;
  selectedParam: string;
  selectedResult: string;
  task: string;
  skatePanel: [string];
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<StateType, Action<string>>;
