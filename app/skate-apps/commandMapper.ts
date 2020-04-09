import mac from './@mac/index';
import giphy from './@giphy/index';
import kanye from './@kanye/index';
import unsplash from './@unsplash/index';
import calc from './@calc/index';

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
    default:
      return function error() {
        console.log('comandMapper could not map command');
      };
  }
}
