import { promises as fs } from 'fs';

export default async function asyncJsonReader(filePath: string) {
  const data = await fs.readFile(filePath, {
    encoding: 'utf8'
  });
  const object = JSON.parse(data);
  return object;
}
