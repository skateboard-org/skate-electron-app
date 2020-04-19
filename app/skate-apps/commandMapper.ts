import mac from './@mac/index';
import giphy from './@giphy/index';
import kanye from './@kanye/index';
import unsplash from './@unsplash/index';
import calc from './@calc/index';
import title from './@title/index';
import wikibot from './@wiki/index';

export default function commandMapper(botName: string) {
  switch (botName) {
    case '@mac':
      return mac;
    case '@giphy':
      return giphy;
    case '@kanye':
      return kanye;
    case '@unsplash':
      return unsplash;
    case '@calc':
      return calc;
    case '@title':
      return title;
    case '@wiki':
      return wikibot;
    default:
      return function error() {
        console.log('comandMapper could not map command');
      };
  }
}
