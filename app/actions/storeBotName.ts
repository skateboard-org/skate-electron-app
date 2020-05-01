import { STORE_BOT_NAME } from './actions';

const storeBotName = (bot: string) => {
  return {
    type: STORE_BOT_NAME,
    payload: {
      selectedBot: bot
    }
  };
};

export default storeBotName;
