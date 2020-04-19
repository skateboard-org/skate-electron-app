import { titleCase } from 'title-case';
import { TypesName, TextResponseType } from '../types';

export default async function title(string: string): Promise<TextResponseType> {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        success: true,
        data: { text: titleCase(string) }
      });
    } catch (error) {
      reject({ error, type: TypesName.Text, success: false });
    }
  });
}
