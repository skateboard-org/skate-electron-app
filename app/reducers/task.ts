import { Action } from 'redux';

import { EXECUTE } from '../actions/actions';

import mac from '../skate-apps/@mac/index';
import giphy from '../skate-apps/@giphy/index';

export default function tasks(state = 'idle', action: Action<string>) {
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
          case '@giphy':
            giphy(action.payload.selectedParam || '')
              .then((res: any) => {
                console.log(res);
                return 'idle';
              })
              .catch((error: any) => {
                console.log(1);
                console.log(error);
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
