const { shell } = require('electron');

export default function sound() {
  shell.beep();
}
