import { Command, TypesName } from '../types';

import { cleanString } from '../../utils/string-functions';
import sleep from './sleep';
import sound from './sound';
import hideWindow from './hide';

function onSuccess(): Command {
  return {
    success: true,
    type: TypesName.Command
  };
}

function onError(): Command {
  return {
    success: false,
    type: TypesName.Command
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
