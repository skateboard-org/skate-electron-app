import { Command } from '../types';

const { exec } = require('child_process');

export default function sleep(): Command {
  // const sleepCommand =
  //    'osascript -e \'tell application "System Events" to sleep\'';

  const sleepCommand2 = 'pmset sleepnow';
  exec(sleepCommand2, (error: any, stdout: any, stderr: any) => {
    console.log('error :', error);
    console.log('stdout :', stdout);
    console.log('stderr :', stderr);
    // callback(stdout);
  });

  return {
    success: true,
    type: 'Command'
  };
}
