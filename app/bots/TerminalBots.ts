import { exec } from 'child_process';
import { cleanString } from '../utils/string-functions';

const executeTerminalBot = async (commandTemplate: string, param: string) => {
  return new Promise((resolve, reject) => {
    console.log(commandTemplate);
    console.log(param);
    let command: string;
    if (param !== undefined || param.length > 0) {
      command = cleanString(commandTemplate).replace(
        /`.*?`/,
        cleanString(param)
      );
    } else {
      command = cleanString(commandTemplate);
    }

    exec(command, (error: any, stdout: string, stderr: string) => {
      console.log('error :', error);
      console.log('stdout :', stdout);
      console.log('stderr :', stderr);

      // if (error) {
      //   return reject(error);
      // }
      return resolve({
        success: true,
        data: { text: stdout }
      });
    });
  });
};

export default executeTerminalBot;
