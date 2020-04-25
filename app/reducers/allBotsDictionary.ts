import { Action } from 'redux';
import { LOAD_BOTS } from '../actions/actions';

export interface BotType {
  name: string;
  title: string;
  icon: string;
  desc: string;
  url: string;
  responseType: string;
  inputParameter: string;
  parameterDesc: string;
  typeAheadUrl: string;
  parameterEnabled: boolean;
  typeAheadEnabled: boolean;

  terminalCommandTemplate: string;

  type: string;
  typeAheadSource: string;
  typeAheadOptions: string[];
}

export default function allBotsDictionary(
  state = new Map(),
  action: Action<string>
) {
  switch (action.type) {
    case LOAD_BOTS: {
      const myAllBotsDictionary: Map<string, BotType> = new Map();
      const { newAllBots } = action.payload;

      newAllBots.forEach((bot: BotType) => {
        const newBot: BotType = {
          name: bot.name,
          type: bot.type,
          title: bot.title,
          icon: bot.icon,
          desc: bot.desc,
          url: bot.url,
          responseType: bot.responseType,
          parameterEnabled: bot.parameterEnabled,
          inputParameter: bot.inputParameter,
          parameterDesc: bot.parameterDesc,
          typeAheadEnabled: bot.typeAheadEnabled,
          typeAheadUrl: bot.typeAheadUrl,
          typeAheadSource: bot.typeAheadSource,
          typeAheadOptions: bot.typeAheadOptions,
          terminalCommandTemplate: bot.terminalCommandTemplate
        };

        myAllBotsDictionary.set(bot.name, newBot);
      });
      return myAllBotsDictionary;
    }
    default:
      return state;
  }
}
