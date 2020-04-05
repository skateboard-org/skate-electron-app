import { Action } from 'redux';

import { EXECUTE } from '../actions/actions';

import mac from '../skate-apps/@mac/index';
import giphy from '../skate-apps/@giphy/index';

export default function skatePanel(state = [], action: Action<string>) {
  switch (action.type) {
    case EXECUTE:
      {
        const param = param;
        const bot = action.payload.selectedBot;

        switch (bot) {
          case '@mac':
            mac(param || '', () => {
              console.log('slept bitches');
            });
            return 'idle';

          case '@giphy':
            giphy(param || '')
              .then((res: any) => {
                console.log(res);
                return 'idle';
              })
              .catch((error: any) => {
                console.log(error);
              });
            return 'idle';

          default:
            console.log('bot not found ', bot);
            break;
        }
      }
      break;
    default:
      return state;
  }
}
