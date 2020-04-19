import wiki from 'wikijs';
import { TypesName } from '../types';

interface requestParameters {
  api_key: string;
  q: string;
  limit: number;
  offset: number;
  rating: string;
  lang: string;
  random_id: string;
}

function transformResponse(res: any) {
  const obj = res[1].map((title, index) => {
    return {
      title,
      link: res[3][index]
    };
  });
  console.log(obj);
  return obj;
}

export default async function wikiBot(searchTerm: string): any {
  return new Promise((resolve, reject) => {
    wiki()
      .api({
        action: 'opensearch',
        format: 'json',
        namespace: '0',
        limit: '10',
        search: searchTerm,
        redirects: 'return'
      })
      .then((res: any) => {
        return resolve({
          data: transformResponse(res),
          success: true,
          type: TypesName.ListOfLinks
        });
      })
      .catch((error: any) => {
        console.log(error);
        reject({ error, success: false });
      });
  });
}
