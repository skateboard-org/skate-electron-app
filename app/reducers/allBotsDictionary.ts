import { Action } from 'redux';
import { LOAD_BOTS } from '../actions/actions';

export interface BotType {
  name: string;
  title: string;
  icon: string;
  desc: string;
  type: string;
  url: string;
  responseType: string;
  parameterEnabled: boolean;
  typeAheadEnabled: boolean;
  typeAheadOptions: string[];
  author: string;
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
          typeAheadEnabled: bot.typeAheadEnabled,
          typeAheadOptions: bot.typeAheadOptions,
          author: bot.author
        };

        myAllBotsDictionary.set(bot.name, newBot);
      });
      return myAllBotsDictionary;
    }
    default:
      return state;
  }
}
