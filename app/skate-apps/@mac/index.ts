import { cleanString } from '../../utils/string-functions';
import sleep from './sleep';
import sound from './sound';

export default function mac(param: string, callback: void) {
  switch (cleanString(param)) {
    case 'sleep':
      sleep(callback);
      break;
    case 'sound':
      sound();
      break;

    default:
      break;
  }
}
