import axios from 'axios';

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
            src: gif.images.preview_webp.url,
            height: gif.images.preview_webp.height,
            width: gif.images.preview_webp.width
          };
        });
        return resolve({ data, success: true, error: undefined });
      })
      .catch(error => {
        return reject({ data: undefined, success: false, error });
      });
  });
}
