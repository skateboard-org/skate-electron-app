const { exec } = require('child_process');

export default function sleep(callback: void): void {
  const sleepCommand =
    'osascript -e \'tell application "System Events" to sleep\'';

  const sleepCommand2 = 'pmset sleepnow';
  exec(sleepCommand2, (error, stdout, stderr) => {
    console.log('error :', error);
    console.log('stdout :', stdout);
    console.log('stderr :', stderr);
    // callback(stdout);
  });
}
