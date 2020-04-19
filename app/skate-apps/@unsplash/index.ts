import Unsplash, { toJson } from 'unsplash-js';
import { ListOfImagesResponseType } from '../types';

const unsplashService = new Unsplash({
  accessKey: '-JcIggEahmGvBSADMG8ScEseFVwpEloiPJxha7MNuWg',
  secret: 'CD8V0o_s_FUSSHP3r5lwrYv1EdLAD5aIAGDh4m-MEVU'
});

export default async function unsplash(
  searchTerm: string
): Promise<ListOfImagesResponseType> {
  return new Promise((resolve, reject) => {
    unsplashService.search
      .photos(searchTerm, 1, 50)
      .then(toJson)
      .then((json: { results: any[] }) => {
        const data = json.results.map(item => ({
          // alt: item.alt_description,
          // color: item.color,
          // description: item.description,
          height: Number(item.height),
          width: Number(item.width),
          src: String(item.urls.thumb)
        }));

        return resolve({ data, success: true });
      })
      .catch(error => {
        return reject({ error, success: false });
      });
  });
}
