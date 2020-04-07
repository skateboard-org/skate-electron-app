import mac from './@mac/index';
import giphy from './@giphy/index';

export default function commandMapper(botName: string) {
  switch (botName) {
    case '@mac':
      return mac;
    case '@giphy':
      return giphy;
    default:
      return function error() {
        console.log('comandMapper could not map command');
      };
  }
}
