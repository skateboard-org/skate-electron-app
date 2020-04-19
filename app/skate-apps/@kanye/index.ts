import axios from 'axios';
import { TextResponseType } from '../types';

export default async function kanye(): Promise<TextResponseType> {
  const url = 'https://api.kanye.rest';

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res: any) => {
        const quote = res.data.quote || '';
        return resolve({ data: { text: quote }, success: true });
      })
      .catch(error => {
        return reject({ data: undefined, success: false, error });
      });
  });
}
