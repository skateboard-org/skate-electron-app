import Unsplash, { toJson } from 'unsplash-js';

const unsplashService = new Unsplash({
  accessKey: '-JcIggEahmGvBSADMG8ScEseFVwpEloiPJxha7MNuWg',
  secret: 'CD8V0o_s_FUSSHP3r5lwrYv1EdLAD5aIAGDh4m-MEVU'
});

export default async function unsplash(searchTerm: string): any {
  return new Promise((resolve, reject) => {
    unsplashService.search
      .photos(searchTerm, 1, 50)
      .then(toJson)
      .then(json => {
        console.log(json);
        const data = json.results.map(item => {
          return {
            alt: item.alt_description,
            color: item.color,
            description: item.description,
            height: item.height,
            width: item.width,
            src: item.urls.thumb
            // src: item.urls.regular
            // src: item.urls.small
          };
        });
        console.log(data);

        return resolve({ data, type: 'ListOfImages', success: true });
      })
      .catch(error => {
        return reject({ error, success: false });
      });
  });
}
