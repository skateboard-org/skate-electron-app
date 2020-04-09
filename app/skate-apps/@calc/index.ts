import { evaluate } from 'mathjs';

import { cleanString } from '../../utils/string-functions';
import { Text, ErrorType, TypesName } from '../types';

export default async function calc(
  expression: string
): Promise<Text | ErrorType> {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        data: evaluate(cleanString(expression)),
        type: TypesName.Text,
        success: true
      });
    } catch (error) {
      reject({ error, type: TypesName.Text, success: false });
    }
  });
}
