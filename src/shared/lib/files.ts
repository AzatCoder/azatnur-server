import util from 'util';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { BusboyFileStream } from '@fastify/busboy';
import { staticPath } from '@lib';

export const createFile = async (file: BusboyFileStream, fileName: string) => {
  const pump = util.promisify(pipeline);
  const fileLocation = path.join(staticPath, fileName);

  return pump(file, fs.createWriteStream(fileLocation));
}

export const deleteFile = async (fileName: string) => {
  const removeFile = util.promisify(fs.unlink);
  const fileLocation = path.join(staticPath, fileName);

  return removeFile(fileLocation);
}
