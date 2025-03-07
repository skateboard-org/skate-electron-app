import { clipboard, nativeImage } from 'electron';
import temp from 'temp';
import path from 'path';
import downloadImage from './download-image';
import { hideMainWindow } from './ipc';
import { ResponseTypes } from '../bots/types';

function copyText(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    clipboard.writeText(String(text));
    resolve();
  });
}

export function pasteText(): string {
  const text = clipboard.readText();
  return text;
}

export async function copyImageFromUrl(url: string): Promise<void> {
  temp.track();
  await temp.mkdir('clipboard-temp-data', async function callback(
    err: any,
    dirPath: string
  ) {
    const dest = path.join(dirPath, 'temp-image-data');

    const filename = await downloadImage(url, dest);

    const img = nativeImage.createFromPath(filename);

    clipboard.writeImage(img);

    console.log('Copied to clipboard!');

    temp.cleanup();
  });
}

function copyContent(content: string, contentType: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (
      contentType === ResponseTypes.ListOfLinks ||
      contentType === ResponseTypes.ListOfText ||
      contentType === ResponseTypes.ListOfText ||
      contentType === ResponseTypes.ListOfGifs
    ) {
      copyText(content);
      return resolve();
    }
    if (contentType === ResponseTypes.ListOfImages) {
      copyImageFromUrl(content);
      return resolve();
    }
    reject();
  });
}

export function copyAndExit(content: string, contentType: string) {
  return new Promise((resolve, reject) => {
    copyContent(content, contentType)
      .then(() => {
        hideMainWindow();
        return resolve();
      })
      .catch(() => {
        console.log('copyConent not working');
        reject();
      });
  });
}
