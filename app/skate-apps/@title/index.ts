import { titleCase } from 'title-case';
import { TypesName, ErrorType } from '../types';

export default async function title(string: string): Promise<Text | ErrorType> {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        data: titleCase(string),
        type: TypesName.Text,
        success: true
      });
    } catch (error) {
      reject({ error, type: TypesName.Text, success: false });
    }
  });
}
