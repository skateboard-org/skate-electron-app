import { Command } from '../types';

import { cleanString } from '../../utils/string-functions';
import sleep from './sleep';
import sound from './sound';

function onSuccess() {
  return {
    success: true
  };
}

function onError() {
  return {
    success: false
  };
}

export default async function mac(
  param: string,
  callback: void
): Promise<Command> {
  return new Promise((resolve, reject) => {
    switch (cleanString(param)) {
      case 'sleep':
        sleep(callback);
        resolve();
        break;
      case 'sound':
        sound();
        resolve();
        break;
      default:
        reject();
    }
  })
    .then(onSuccess)
    .catch(onError);
}
