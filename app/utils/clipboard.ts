import { clipboard, nativeImage } from 'electron';
import temp from 'temp';

import path from 'path';
import downloadImage from './download-image';

export function copyText(text: string): void {
  clipboard.writeText(text);
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
