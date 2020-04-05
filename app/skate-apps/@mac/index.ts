import { Command } from '../types';

import { cleanString } from '../../utils/string-functions';
import sleep from './sleep';
import sound from './sound';

export default function mac(param: string, callback: void): Command {
  switch (cleanString(param)) {
    case 'sleep':
      sleep(callback);
      return {
        success: true
      };
    case 'sound':
      sound();
      return {
        success: true
      };
    default:
      return {
        success: false
      };
  }
}
