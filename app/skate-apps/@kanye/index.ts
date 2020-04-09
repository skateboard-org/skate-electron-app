import axios from 'axios';

export default async function kanye(): any {
  const url = 'https://api.kanye.rest';

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res: any) => {
        const data = res.data.quote || '';
        return resolve({ data, success: true, error: undefined, type: 'Text' });
      })
      .catch(error => {
        return reject({ data: undefined, success: false, error });
      });
  });
}
