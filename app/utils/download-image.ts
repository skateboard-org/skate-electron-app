import download from 'image-downloader';

export default async function downloadImage(
  url: string,
  dest: string
): Promise<string> {
  try {
    const { filename, image } = await download.image({
      url,
      dest,
      extractFilename: false
    });
    return filename;
  } catch (e) {
    console.error(e);
  }
}
