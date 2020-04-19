import { CommandResponseType } from '../types';

import { cleanString } from '../../utils/string-functions';
import sleep from './sleep';
import sound from './sound';
import hideWindow from './hide';

function onSuccess(): CommandResponseType {
  return {
    success: true
  };
}

function onError(): CommandResponseType {
  return {
    success: false
  };
}

export default async function mac(param: string): Promise<CommandResponseType> {
  return new Promise((resolve, reject) => {
    switch (cleanString(param)) {
      case 'sleep':
        sleep();
        resolve();
        break;
      case 'sound':
        sound();
        resolve();
        break;
      case 'hide':
        hideWindow();
        resolve();
        break;
      default:
        reject();
    }
  })
    .then(onSuccess)
    .catch(onError);
}
