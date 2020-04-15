import { clipboard, nativeImage } from 'electron';
import temp from 'temp';
import path from 'path';
import downloadImage from './download-image';
import { hideMainWindow } from './ipc';

export function copyText(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    clipboard.writeText(text);
    resolve();
  });
}

export function pasteText(): string {
  const text = clipboard.readText();
  return text;
}

export async function copyImageFromUrl(url: string): Promise<void> {
  console.log(url);
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

export function copyContent(
  content: string,
  contentType: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (
      contentType === TypesName.ListOfLinks ||
      contentType === TypesName.Text ||
      contentType === TypesName.ListOfText
    ) {
      return resolve(copyText(content));
    }
    if (
      contentType === TypesName.ListOfImages ||
      contentType === TypesName.ListOfGifs
    ) {
      return resolve(copyImageFromUrl(content));
    }
    reject();
  });
}

export function copyAndCleanExit(content: string, contentType: string) {
  copyContent(content, contentType)
    .then(() => hideMainWindow())
    .catch(() => console.log('Couldnt Hide Window'));
}
