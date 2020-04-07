const { shell } = require('electron');

export default function sound() {
  // const promise = new Promise(resolve => {
  shell.beep();
  // resolve();
  // });
  // return promise;
}
