import { evaluate } from 'mathjs';

import { cleanString } from '../../utils/string-functions';
import { TextResponseType } from '../types';

export default async function calc(
  expression: string
): Promise<TextResponseType> {
  return new Promise((resolve, reject) => {
    try {
      return resolve({
        data: { text: evaluate(cleanString(expression)) },
        success: true
      });
    } catch (error) {
      return reject({ error, success: false });
    }
  });
}
