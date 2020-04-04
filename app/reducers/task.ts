import { Action } from 'redux';

import { EXECUTE } from '../actions/actions';

import mac from '../skate-apps/@mac/index';

export default function selectedBot(state = 'idle', action: Action<string>) {
  switch (action.type) {
    case EXECUTE:
      {
        const param = action.payload.selectedParam;
        console.log('param: ', param);
        switch (action.payload.selectedBot) {
          case '@mac':
            mac(action.payload.selectedParam || '', () => {
              console.log('slept bitches');
            });
            return 'idle';
          default:
            console.log('bot not found ', action.payload.selectedBot);
            break;
        }
      }
      break;
    default:
      return state;
  }
}
