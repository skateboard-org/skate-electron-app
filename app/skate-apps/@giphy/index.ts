import axios from 'axios';
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

export default async function giphy(searchTerm: string): any {
  const url = 'https://api.giphy.com/v1/gifs/search';

  const params: requestParameters = {
    api_key: 'xTbQBaXrp92h22qOSCCSNqOte1nS4gG8',
    q: searchTerm || '404',
    limit: 25,
    offset: 0,
    rating: 'r',
    lang: 'en',
    random_id: '1234'
  };

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((res: any) => {
        const data = res.data.data.map((gif: any) => {
          return {
            id: gif.id,
            preview_src: gif.images.preview_gif.url,
            src: gif.images.original.url,
            height: Number(gif.images.preview_gif.height),
            width: Number(gif.images.preview_gif.width)
          };
        });
        return resolve({
          data,
          success: true,
          error: undefined,
          type: TypesName.ListOfGifs
        });
      })
      .catch(error => {
        return reject({
          data: undefined,
          success: false,
          error,
          type: TypesName.ListOfGifs
        });
      });
  });
}
